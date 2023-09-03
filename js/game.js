const fraseElement = document.getElementById("frase");
const respostaInput = document.getElementById("resposta");
const verificarButton = document.getElementById("verificar");
const resultadoElement = document.getElementById("resultado");
const pularButton = document.getElementById("pular");

let frases = [];
let indiceAtual = 0;
let indiceRandom = 0;

function carregarFrases() {
    fetch("js/frases.json")
        .then(response => response.json())
        .then(data => {
            frases = data;
            mostrarFraseRandom();
        })
        .catch(error => console.error("Erro ao carregar frases:", error));
}

function mostrarFraseRandom() {
    indiceRandom = Math.round(Math.random() * frases.length);

    if (indiceRandom < frases.length) {
        fraseElement.textContent = frases[indiceRandom].frase;
    } else {
        finalizarJogo();
    }
    respostaInput.value = "";
}

function verificarResposta() {
    const respostaUsuario = respostaInput.value.trim().toLowerCase();
    const respostaCorreta = frases[indiceRandom].resposta.toLowerCase();

    if (
        respostaCorreta.includes(respostaUsuario) ||
        respostaUsuario.includes(respostaCorreta)
    ) {
        resultadoElement.textContent = "Certa resposta!";
        setTimeout(() => {
            resultadoElement.textContent = "";
        }, 2000);

        indiceAtual++;
        if (indiceAtual < frases.length) {
            mostrarFraseRandom();
        } else {
            finalizarJogo();
        }
        respostaInput.value = "";
    } else {
        resultadoElement.textContent = "Você errou. Tente novamente.";
    }
}

function pularPergunta() {
    indiceAtual++;
    if (indiceAtual < frases.length) {
        mostrarFraseRandom();
        resultadoElement.textContent = "";
    } else {
        finalizarJogo();
        pularButton.disabled = true;
    }
    respostaInput.value = "";
}

function finalizarJogo() {
    fraseElement.textContent = "Fim do jogo";
    respostaInput.disabled = true;
    verificarButton.disabled = true;
}

pularButton.addEventListener("click", pularPergunta);

verificarButton.addEventListener("click", function () {
    if (respostaInput.value.trim() !== "") {
        verificarResposta();
    } else {
        resultadoElement.textContent = "Digite um nome no campo";
    }
});

carregarFrases();
