import { createReadStream } from 'node:fs';
import { access, realpath, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT_REAL = await realpath(APP_ROOT);
const WORKSPACE_ROOT = path.resolve(process.env.PREVIEW_WORKSPACE_ROOT || path.join(APP_ROOT, '..', 'spec-repo'));
const WORKSPACE_ROOT_REAL = await realpath(WORKSPACE_ROOT);
const port = Number(process.env.PORT || 3001);

const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.htm': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.eot': 'application/vnd.ms-fontobject',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain; charset=utf-8',
    '.wasm': 'application/wasm',
    '.webp': 'image/webp',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml; charset=utf-8'
};

function isInside(root, candidate) {
    const relative = path.relative(root, candidate);
    return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function isPrivatePath(relativePath) {
    return relativePath.split(/[\\/]+/).some(segment =>
        segment === '.git' || segment === '.vscode' || segment === 'node_modules' ||
        segment === '.aws' || segment === '.codex' || /^\.env(?:\.|$)/i.test(segment)
    );
}

async function resolveFile(root, rootReal, relativePath) {
    if (isPrivatePath(relativePath)) return null;

    let candidate = path.resolve(root, relativePath || '.');
    if (!isInside(root, candidate)) return null;

    try {
        let info = await stat(candidate);
        if (info.isDirectory()) {
            candidate = path.join(candidate, 'index.html');
            info = await stat(candidate);
        }
        if (!info.isFile()) return null;

        const candidateReal = await realpath(candidate);
        if (!isInside(rootReal, candidateReal)) return null;
        await access(candidateReal);
        return { path: candidateReal, size: info.size };
    } catch {
        return null;
    }
}

function sendText(response, statusCode, message) {
    response.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(message);
}

const server = http.createServer(async (request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.setHeader('Allow', 'GET, HEAD');
        sendText(response, 405, 'Method not allowed');
        return;
    }

    let requestUrl;
    try {
        requestUrl = new URL(request.url, `http://${request.headers.host || '127.0.0.1'}`);
    } catch {
        sendText(response, 400, 'Invalid URL path');
        return;
    }
    let pathname;
    try {
        pathname = decodeURIComponent(requestUrl.pathname);
    } catch {
        sendText(response, 400, 'Invalid URL path');
        return;
    }

    if (pathname === '/workspace') {
        response.writeHead(308, { Location: '/workspace/', 'Cache-Control': 'no-store' });
        response.end();
        return;
    }

    const isWorkspace = pathname.startsWith('/workspace/');
    const root = isWorkspace ? WORKSPACE_ROOT : APP_ROOT;
    const rootReal = isWorkspace ? WORKSPACE_ROOT_REAL : APP_ROOT_REAL;
    const relativePath = isWorkspace ? pathname.slice('/workspace/'.length) : pathname.replace(/^\/+/, '');
    const requestedPath = path.resolve(root, relativePath || '.');
    if (isInside(root, requestedPath)) {
        try {
            if ((await stat(requestedPath)).isDirectory() && !pathname.endsWith('/')) {
                response.writeHead(308, {
                    Location: `${pathname}/${requestUrl.search}`,
                    'Cache-Control': 'no-store'
                });
                response.end();
                return;
            }
        } catch {
            // The normal file resolution below returns a 404 for missing paths.
        }
    }

    const file = await resolveFile(root, rootReal, relativePath);
    if (!file) {
        sendText(response, 404, 'Not found');
        return;
    }

    const extension = path.extname(file.path).toLowerCase();
    response.writeHead(200, {
        'Content-Type': mimeTypes[extension] || 'application/octet-stream',
        'Content-Length': file.size,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
    });
    if (request.method === 'HEAD') {
        response.end();
        return;
    }

    createReadStream(file.path).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Monaco IDE V8: http://127.0.0.1:${port}/docs/v8/`);
    console.log(`Workspace static root: http://127.0.0.1:${port}/workspace/`);
    console.log(`Workspace folder: ${WORKSPACE_ROOT_REAL}`);
});
