const btIniciar = document.querySelector("#btIniciar");
const btNext = document.querySelector("#btNext");
const btResetar = document.querySelector("#btResetar");
var socket = io("https://bingodafamilia.herokuapp.com/");
let sorteados = [];
let atual = -1;
let andamento;

// Montar um array com 60 numeros de 1 a 60
const numbers = [...Array(60).keys()].map((i) => i + 1);

// Embaralhar os numeros
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Iniciar o jogo
btIniciar.addEventListener("click", () => {
    sorteados = shuffle(numbers);
    andamento = setInterval(() => {
        atual++;
        if (atual < sorteados.length) {
            messageObject = {
                qtdSorteados: atual,
                numero: sorteados[atual],
            };

            socket.emit("sorteado", messageObject);

            const div = document.createElement("div");
            div.classList.add("numero");
            div.innerHTML = sorteados[atual];
            document.querySelector("#resultado").appendChild(div);
        } else {
            btNext.classList.add("hidden");
        }
    }, 1000);
});

btResetar.addEventListener("click", () => {
    clearInterval(andamento);
    document.querySelector("#resultado").innerHTML = "";
    atual = -1;

    socket.emit("resetar");
});
