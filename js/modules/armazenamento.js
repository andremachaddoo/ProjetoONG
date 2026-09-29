const CHAVE_CADASTRO = "ongEsperanca.cadastro";

export function salvarCadastro(formulario) {
    const dadosFormulario = new FormData(formulario);
    const cadastro = Object.fromEntries(dadosFormulario.entries());

    cadastro.novidades = formulario.querySelector("#novidades").checked;

    try {
        const textoCadastro = JSON.stringify(cadastro);
        localStorage.setItem(CHAVE_CADASTRO, textoCadastro);

        return true;
    } catch (erro) {
        console.error("Não foi possível salvar o cadastro:", erro);
        return false;
    }
}

export function recuperarCadastro(formulario) {
    try {
        const textoSalvo = localStorage.getItem(CHAVE_CADASTRO);

        if (!textoSalvo) {
            return;
        }

        const cadastro = JSON.parse(textoSalvo);

        if (
            !cadastro ||
            typeof cadastro !== "object" ||
            Array.isArray(cadastro)
        ) {
            return;
        }

        formulario.querySelectorAll("input[name]").forEach(function (campo) {
            const valor = cadastro[campo.name];

            if (campo.type === "checkbox") {
                campo.checked = valor === true;
            } else if (campo.type === "radio") {
                campo.checked = campo.value === valor;
            } else if (typeof valor === "string") {
                campo.value = valor;
            }
        });
    } catch (erro) {
        console.error("Não foi possível recuperar o cadastro:", erro);
    }
}