import { validarCampo } from "./validacao.js";
import {
    recuperarCadastro,
    salvarCadastro
} from "./armazenamento.js";

export function ativarFormulario() {
    const formulario = document.getElementById("formulario-cadastro");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");

    if (!formulario || !mensagemSucesso) {
        return;
    }

    formulario.noValidate = true;
    recuperarCadastro(formulario);

    const campos = formulario.querySelectorAll(
        'input:not([type="radio"]):not([type="checkbox"])'
    );

    campos.forEach(function (campo) {
        campo.addEventListener("input", function () {
            mensagemSucesso.style.display = "none";
            validarCampo(campo);
        });

        campo.addEventListener("blur", function () {
            validarCampo(campo);
        });
    });

    formulario.addEventListener("input", function () {
        mensagemSucesso.style.display = "none";
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let primeiroCampoInvalido = null;

        campos.forEach(function (campo) {
            const valido = validarCampo(campo);

            if (!valido && primeiroCampoInvalido === null) {
                primeiroCampoInvalido = campo;
            }
        });

        if (primeiroCampoInvalido) {
            mensagemSucesso.style.display = "none";
            primeiroCampoInvalido.focus();
            return;
        }

        const salvou = salvarCadastro(formulario);

        if (salvou) {
            mensagemSucesso.textContent =
                "Cadastro salvo neste navegador com sucesso!";
            mensagemSucesso.style.display = "block";
        } else {
            mensagemSucesso.style.display = "none";
            alert("Não foi possível salvar o cadastro. Tente novamente.");
        }
    });
}