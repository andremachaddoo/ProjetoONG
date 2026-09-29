    export function renderizarProjetos() {
    const lista = document.getElementById("lista-projetos");
    const modelo = document.getElementById("modelo-projeto");

    if (!lista || !modelo) {
        return;
    }

    const projetos = [
        {
            titulo: "Arrecadação de alimentos",
            descricao:
                "Projeto destinado à arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade."
        },
        {
            titulo: "Ações de voluntariado",
            descricao:
                "Realizamos ações comunitárias com a participação de voluntários, promovendo solidariedade e apoio às comunidades."
        }
    ];

    lista.replaceChildren();

    projetos.forEach(function (projeto) {
        const copia = modelo.content.cloneNode(true);

        copia.querySelector("h3").textContent = projeto.titulo;
        copia.querySelector("p").textContent = projeto.descricao;

        lista.appendChild(copia);
    });
}