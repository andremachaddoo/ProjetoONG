export function ativarMenu() {
    const botaoMenu = document.querySelector(".menu-hamburguer");
    const menu = document.querySelector(".menu-principal");

    if (!botaoMenu || !menu) {
        return;
    }

    botaoMenu.addEventListener("click", function () {
        menu.classList.toggle("ativo");

        const menuAberto = menu.classList.contains("ativo");
        botaoMenu.setAttribute("aria-expanded", menuAberto);
    });
}