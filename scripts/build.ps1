$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    # Resolve o executável instalado pelo gerenciador de pacotes.
    $bundlerPath = node -e "const p=require('path');console.log(require.resolve('@esbuild/win32-x64/esbuild.exe',{paths:[p.dirname(require.resolve('esbuild'))]}))"
    if ($LASTEXITCODE -ne 0) { throw 'Instale as dependências antes de gerar a versão de produção.' }
    foreach ($entrada in @('js/script.js', 'css/style.css')) {
        $opcoes = @($entrada, '--bundle', '--target=es2020', '--legal-comments=none')
        if ($entrada.EndsWith('.js')) { $opcoes += '--format=esm' }
        & $bundlerPath @opcoes "--outfile=.build/$entrada"
        if ($LASTEXITCODE -ne 0) { throw "Falha ao preparar $entrada" }
        & $bundlerPath @opcoes '--minify' "--outfile=dist/$entrada"
        if ($LASTEXITCODE -ne 0) { throw "Falha ao minificar $entrada" }
    }
    node scripts/finalizar-build.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao preparar HTML e relatório.' }
} finally { Pop-Location }
