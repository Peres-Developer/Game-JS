let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;
let criaMosquitoTempo = 1500;

const nivel = new URLSearchParams(window.location.search).get('nivel');

const niveis = {
    normal: 1500,
    dificil: 1000,
    chucknorris: 750
};

criaMosquitoTempo = niveis[nivel] || criaMosquitoTempo;

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();

const cronometro = setInterval(() => {
    tempo--;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

function posicaoRandomica() {

    const mosquitoAnterior = document.getElementById('mosquito');
    if (mosquitoAnterior) {
        mosquitoAnterior.remove();

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html';
        } else {
            document.getElementById(`v${vidas}`).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }

    const posicaoX = Math.max(0, Math.floor(Math.random() * largura) - 90);
    const posicaoY = Math.max(0, Math.floor(Math.random() * altura) - 90);

    const mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`;
    mosquito.style.left = `${posicaoX}px`;
    mosquito.style.top = `${posicaoY}px`;
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = () => mosquito.remove();

    document.body.appendChild(mosquito);
}

function tamanhoAleatorio() {
    const tamanhos = ['mosquito1', 'mosquito2', 'mosquito3'];
    return tamanhos[Math.floor(Math.random() * tamanhos.length)];
}

function ladoAleatorio() {
    return Math.random() < 0.5 ? 'ladoA' : 'ladoB';
}
