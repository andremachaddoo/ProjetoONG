import { minify } from 'html-minifier-terser';
import { mkdir, readFile, writeFile, readdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const destino = path.join(raiz, 'dist');
await mkdir(destino, { recursive: true });
const linhas = [];
function registrar(arquivo, antes, depois) {
    linhas.push({ arquivo, antesBytes: antes, depoisBytes: depois,
        reducaoPercentual: Number(((antes - depois) / antes * 100).toFixed(2)) });
}

for (const entrada of ['js/script.js', 'css/style.css']) {
 const base = await readFile(path.join(raiz, '.build', entrada));
 const otimizado = await readFile(path.join(destino, entrada));
 registrar(entrada, base.length, otimizado.length);
}
await mkdir(path.join(destino, 'html'), { recursive: true });
for (const arquivo of await readdir(path.join(raiz, 'html'))) {
    if (!arquivo.endsWith('.html')) continue;
    const original = await readFile(path.join(raiz, 'html', arquivo), 'utf8');
    const resultado = await minify(original, { collapseWhitespace: true,
        conservativeCollapse: true, removeComments: true });
    await writeFile(path.join(destino, 'html', arquivo), resultado);
    registrar('html/' + arquivo, Buffer.byteLength(original), Buffer.byteLength(resultado));
}
await cp(path.join(raiz, 'imagens'), path.join(destino, 'imagens'), { recursive: true });
const antes = linhas.reduce((s, l) => s + l.antesBytes, 0);
const depois = linhas.reduce((s, l) => s + l.depoisBytes, 0);
registrar('TOTAL (HTML, CSS e JavaScript)', antes, depois);
await writeFile(path.join(raiz, 'relatorio-minificacao.json'), JSON.stringify({
    metodologia: 'Bytes sem gzip/Brotli. JavaScript e CSS: mesmo bundle antes/depois de minify. HTML: original versus minificado. Imagens não incluídas.',
    ferramentas: { esbuild: '0.28.2', htmlMinifierTerser: '7.2.0' }, resultados: linhas
}, null, 2));
console.table(linhas);
