import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const raiz = fileURLToPath(new URL('../dist/', import.meta.url));
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png' };
createServer(async (req, res) => {
    try {
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const arquivo = path.resolve(raiz, '.' + (pathname === '/' ? '/html/index.html' : pathname));
        if (!arquivo.startsWith(raiz)) { res.writeHead(403).end(); return; }
        const dados = await readFile(arquivo);
        res.writeHead(200, { 'Content-Type': tipos[path.extname(arquivo)] || 'application/octet-stream' });
        res.end(dados);
    } catch { res.writeHead(404).end('Arquivo não encontrado'); }
}).listen(4173, '127.0.0.1', () => console.log('Abra http://127.0.0.1:4173/html/index.html'));
