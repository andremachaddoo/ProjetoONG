# Preparação para produção

A versão de produção usa esbuild 0.28.2 para reunir os módulos JavaScript e minificar JavaScript e CSS. O HTML é minificado com html-minifier-terser 7.2.0, preservando de forma conservadora os espaços entre elementos.

## Gerar novamente no Windows

Com Node.js e npm instalados, abra o terminal na pasta ProjetoONG:

```powershell
npm install
npm run build
npm run preview
```

Abra http://127.0.0.1:4173/html/index.html. Também é possível abrir `dist/html/index.html` pelo Live Server do VS Code. Use um servidor HTTP, pois a navegação carrega páginas com fetch.

O build usa `js/script.js` e `css/style.css` como entradas, reúne os módulos (`bundle`), gera JavaScript em formato ESM, usa alvo ES2020 e ativa `minify`. Os arquivos finais são gravados em `dist/`, mantendo as pastas html, css, js e imagens. Os arquivos originais continuam editáveis fora de dist. As imagens são copiadas sem otimização nesta etapa.

O comando de build foi preparado para Windows x64. `.build/` contém a base de comparação sem minificação. `relatorio-minificacao.json` registra os tamanhos em bytes. Essas pastas geradas e node_modules ficam fora do Git.

## Medição realizada

| Grupo | Antes (bytes) | Depois (bytes) | Redução |
|---|---:|---:|---:|
| JavaScript | 8.096 | 4.392 | 45,75% |
| CSS | 5.433 | 4.451 | 18,07% |
| HTML (três páginas) | 5.846 | 4.911 | 15,99% |
| Total | 19.375 | 13.754 | 29,01% |

Metodologia: tamanhos sem gzip/Brotli e sem imagens. Para JavaScript e CSS, compara-se o mesmo bundle com minify desativado e ativado. Para HTML, comparam-se os arquivos originais e minificados. Fórmula: (antes - depois) / antes × 100. Os números mudam quando o código-fonte muda.

## Verificação funcional

Na cópia de produção, foram testados: abertura da página inicial, navegação para Projetos e Cadastro, exibição dos projetos, alternância de alto contraste com atualização de aria-pressed, validação de campos obrigatórios com foco no primeiro campo inválido, salvamento de cadastro fictício e recuperação após recarregar. Isso não representa uma auditoria completa de acessibilidade ou de todos os navegadores.

## Respostas para a atividade

1. Utilizei o esbuild como bundler, configurado com as entradas js/script.js e css/style.css, agrupamento dos módulos JavaScript, formato ESM, alvo ES2020 e minificação ativada. A versão de produção foi gerada em dist, preservando a estrutura de pastas e os arquivos originais. Para minificar as três páginas HTML, utilizei também o html-minifier-terser.

2. A redução total aproximada foi de 29,01%, passando de 19.375 para 13.754 bytes no conjunto de HTML, CSS e JavaScript. O JavaScript apresentou redução de 45,75% e o CSS de 18,07%. A medição não inclui imagens nem compressão gzip/Brotli. Para isolar a minificação, comparei os bundles de JavaScript e CSS antes e depois de ativar essa opção.

3. O principal cuidado foi preservar os caminhos usados na navegação e o funcionamento dos módulos e dos recursos de acessibilidade. Mantive a estrutura de pastas na versão de produção e testei a navegação, a exibição dos projetos, a validação e o salvamento do formulário, a recuperação dos dados e o botão de alto contraste com aria-pressed. As funcionalidades testadas continuaram operando após a minificação.
