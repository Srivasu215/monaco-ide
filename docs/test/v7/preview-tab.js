
const params = new URLSearchParams(location.search);
const channelName = params.get('channel') || 'keshavsoft-monaco-preview';
const channel = new BroadcastChannel(channelName);
const root = document.getElementById('sandpackRoot');
let client = null;
let loading = false;
let queued = null;
const status = document.getElementById('status');

function normalizeFiles(payload) {
    const files = {};
    const entry = payload.entry;
    const source = payload.files || {};
    // Sandpack's vanilla environment expects an index.html entry. Preserve the
    // workspace-relative asset paths so relative CSS/JS references continue to work.
    let html = source[entry] || '<h1>No HTML entry file</h1>';
    // Inline binary image data URLs into HTML so they can cross the tab boundary.
    html = html.replace(/(src\\s*=\\s*["'])([^"']+)(["'])/gi, (match, before, ref, after) => {
        const resolved = resolveRelative(entry, ref);
        return resolved && source[resolved]?.startsWith('data:') ? before + source[resolved] + after : match;
    });
    files['/index.html'] = { code: html };
    for (const [path, code] of Object.entries(source)) {
        if (path === entry) continue;
        files['/' + path.replace(/^\/+/, '')] = { code: String(code) };
    }
    return files;
}
function resolveRelative(fromFile, ref) {
    if (!ref || /^(https?:|data:|\/\/|#)/i.test(ref)) return null;
    const stack = fromFile.split('/').slice(0, -1);
    for (const part of ref.split(/[?#]/)[0].split('/')) {
        if (!part || part === '.') continue;
        if (part === '..') stack.pop();
        else stack.push(part);
    }
    return stack.join('/');
}
async function mount(payload) {
    if (payload.type === 'NO_ENTRY') {
        status.textContent = payload.message;
        return;
    }
    queued = payload;
    if (loading) return;
    loading = true;
    try {
        const { loadSandpackClient } = await import('https://esm.sh/@codesandbox/sandpack-client@2.20.0');
        const files = normalizeFiles(queued);
        if (!client) {
            const iframe = document.createElement('iframe');
            iframe.title = 'Sandpack rendered application';
            iframe.allow = 'accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone';
            root.replaceChildren(iframe);
            client = await loadSandpackClient(iframe, {
                files,
                environment: 'vanilla',
                entry: '/index.html'
            }, {
                showOpenInCodeSandbox: false,
                showErrorScreen: true,
                showLoadingScreen: true,
                width: '100%',
                height: '100%'
            });
        } else {
            client.updateSandbox({
                files: normalizeFiles(queued),
                environment: 'vanilla',
                entry: '/index.html'
            });
        }
        status.textContent = `Sandpack preview · ${queued.entry}`;
    } catch (error) {
        status.textContent = 'Sandpack failed to load';
        channel.postMessage({type:'PREVIEW_ERROR', error: error.message});
        console.error(error);
    } finally {
        loading = false;
        if (queued && queued !== payload) mount(queued);
    }
}
channel.addEventListener('message', event => {
    const payload = event.data;
    if (payload?.type === 'RENDER' || payload?.type === 'NO_ENTRY') mount(payload);
});
window.addEventListener('error', event => channel.postMessage({type:'PREVIEW_ERROR', error:event.message}));
channel.postMessage({type:'READY'});
