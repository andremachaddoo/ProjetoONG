export function validarCampo(campo) {
    let mensagem = "";

    campo.setCustomValidity("");

    if (campo.required && campo.value.trim() === "") {
        mensagem = "Preencha este campo.";
    } else if (campo.validity.typeMismatch) {
        mensagem = "Informe um e-mail válido, como nome@exemplo.com.";
    } else if (campo.validity.patternMismatch) {
        const orientacoes = {
            cpf: "Use o formato 000.000.000-00.",
            telefone: "Use o formato (00) 00000-0000.",
            cep: "Use o formato 00000-000."
        };

        mensagem = orientacoes[campo.id] || "Confira o formato informado.";
    } else if (!campo.validity.valid) {
        mensagem = "Confira o valor informado.";
    }

    campo.setCustomValidity(mensagem);

    const idErro = "erro-" + campo.id;
    let aviso = document.getElementById(idErro);

    if (!aviso) {
        aviso = document.createElement("small");
        aviso.id = idErro;
        aviso.className = "erro-campo";
        aviso.setAttribute("aria-live", "polite");
        campo.insertAdjacentElement("afterend", aviso);

        const descricaoAtual = campo.getAttribute("aria-describedby");

        campo.setAttribute(
            "aria-describedby",
            descricaoAtual ? descricaoAtual + " " + idErro : idErro
        );
    }

    aviso.textContent = mensagem;
    aviso.hidden = mensagem === "";

    campo.classList.toggle("campo-invalido", mensagem !== "");
    campo.classList.toggle("campo-valido", mensagem === "");
    campo.setAttribute("aria-invalid", String(mensagem !== ""));

    return mensagem === "";
}