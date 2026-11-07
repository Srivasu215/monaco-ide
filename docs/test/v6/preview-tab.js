const params = new URLSearchParams(location.search);
const channel = new BroadcastChannel(params.get('channel') || 'keshavsoft-monaco-preview-v6');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function resolvePath(fromFile, reference) {
  const clean = String(reference || '').split(/[?#]/)[0];
  if (!clean || clean.startsWith('/') || /^[a-z]+:/i.test(clean) || clean.startsWith('//') || clean.startsWith('data:')) return null;
  const stack = fromFile.split('/').slice(0,-1);
  for (const part of clean.split('/')) { if (!part || part === '.') continue; if (part === '..') stack.pop(); else stack.push(part); }
  return stack.join('/');
}
async function render(payload) {
  if (payload.type === 'NO_ENTRY') { document.body.textContent = payload.message; return; }
  const files = payload.files || {}, entry = payload.entry, html = files[entry];
  if (typeof html !== 'string') return;
  const parsed = new DOMParser().parseFromString(html,'text/html');
  document.title = parsed.title || `Preview — ${entry}`;
  document.head.querySelectorAll('[data-preview-asset]').forEach(n => n.remove());
  for (const link of [...parsed.querySelectorAll('link[rel="stylesheet"][href]')]) {
    const path = resolvePath(entry,link.getAttribute('href'));
    if (path && typeof files[path] === 'string') {
      const style = document.createElement('style'); style.dataset.previewAsset='1'; style.textContent=files[path]; link.replaceWith(style);
    }
  }
  for (const img of [...parsed.querySelectorAll('img[src]')]) {
    const path=resolvePath(entry,img.getAttribute('src'));
    if (path && typeof files[path]==='string' && files[path].startsWith('data:')) img.src=files[path];
  }
  const scripts=[...parsed.querySelectorAll('script')]; scripts.forEach(s=>s.remove());
  const bodyNodes=[...parsed.body.childNodes].map(n=>document.importNode(n,true));
  document.body.replaceChildren(...bodyNodes);
  for (const style of [...parsed.head.querySelectorAll('style')]) {
    const copy=document.createElement('style'); copy.dataset.previewAsset='1'; copy.textContent=style.textContent; document.head.appendChild(copy);
  }
  for (const link of [...parsed.head.querySelectorAll('link[rel="stylesheet"]')]) {
    const href=link.getAttribute('href'), path=resolvePath(entry,href);
    if (path && typeof files[path]==='string') { const style=document.createElement('style'); style.dataset.previewAsset='1'; style.textContent=files[path]; document.head.appendChild(style); }
    else if (href) { const copy=document.createElement('link'); copy.rel='stylesheet'; copy.href=href; copy.dataset.previewAsset='1'; document.head.appendChild(copy); }
  }
  // Scripts execute in this preview tab's own document; no iframe is created.
  for (const old of scripts) {
    const script=document.createElement('script');
    for (const attr of [...old.attributes]) if (attr.name!=='src') script.setAttribute(attr.name,attr.value);
    const src=old.getAttribute('src'), path=src && resolvePath(entry,src);
    if (path && typeof files[path]==='string') script.textContent=files[path];
    else if (src) script.src=src;
    else script.textContent=old.textContent;
    document.body.appendChild(script);
  }
  const badge=document.createElement('div'); badge.id='previewStatus'; badge.textContent=`Live preview · ${entry}`;
  badge.style.cssText='position:fixed;z-index:2147483647;left:10px;bottom:10px;padding:5px 9px;background:#111827cc;color:#fff;font:11px monospace;pointer-events:none';
  document.body.appendChild(badge);
}
channel.addEventListener('message',e=>{ if(e.data?.type==='RENDER'||e.data?.type==='NO_ENTRY') render(e.data).catch(err=>channel.postMessage({type:'PREVIEW_ERROR',error:err.message})); });
window.addEventListener('error',e=>channel.postMessage({type:'PREVIEW_ERROR',error:e.message}));
channel.postMessage({type:'READY'});
