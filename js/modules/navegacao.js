import { ativarFormulario } from "./formulario.js";
import { renderizarProjetos } from "./projetos.js";

export function iniciarNavegacao() {
    const conteudoPrincipal =
        document.getElementById("conteudo-principal");

    if (!conteudoPrincipal) {
        return;
    }

    const conteudoInicio = conteudoPrincipal.innerHTML;
    let ultimaNavegacao = 0;

    async function navegar() {
        const navegacaoAtual = ++ultimaNavegacao;
        const rota = window.location.hash || "#inicio";

        if (rota === "#inicio") {
            conteudoPrincipal.className = "";
            conteudoPrincipal.innerHTML = conteudoInicio;
            return;
        }

        const paginas = {
            "#projetos": "projetos.html",
            "#cadastro": "cadastro.html"
        };

        const arquivo = paginas[rota];

        if (!arquivo) {
            conteudoPrincipal.className = "";
            conteudoPrincipal.textContent = "Página não encontrada.";
            return;
        }

        conteudoPrincipal.className = "";
        conteudoPrincipal.textContent = "Carregando...";

        try {
            const resposta = await fetch(arquivo);

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar a página.");
            }

            const html = await resposta.text();

            const documento = new DOMParser().parseFromString(
                html,
                "text/html"
            );

            const novoConteudo = documento.querySelector("main");

            if (!novoConteudo) {
                throw new Error("Conteúdo principal não encontrado.");
            }

            if (navegacaoAtual !== ultimaNavegacao) {
                return;
            }

            conteudoPrincipal.className = novoConteudo.className;
            conteudoPrincipal.innerHTML = novoConteudo.innerHTML;

            ativarFormulario();
            renderizarProjetos();
        } catch (erro) {
            if (navegacaoAtual !== ultimaNavegacao) {
                return;
            }

            conteudoPrincipal.textContent =
                "Não foi possível abrir o conteúdo. Tente novamente.";

            console.error(erro);
        }
    }

    window.addEventListener("hashchange", navegar);
    navegar();
}