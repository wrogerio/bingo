// get array of numbers from 1 to 60 and shuffle it
const numbers = [...Array(60).keys()].map((i) => i + 1);
var socket = io("https://bingodafamilia.herokuapp.com");

socket.on("sorteados", function (data) {
  setTimeout(() => {
    $("#numero" + data)
      .removeClass("alert-primary")
      .addClass("alert-danger");
  }, 2000);
});

socket.on("resetados", function (data) {
  console.log("#numero" + data);
});

// shuffle array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const sorteados = shuffle(numbers).slice(0, 30);

// sort array sorteados
sorteados.sort((a, b) => a - b);

sorteados.map((num) => {
  const div = document.createElement("div");
  div.classList.add("numeroCartela");
  div.classList.add("alert");
  div.classList.add("alert-primary");
  div.classList.add("classe" + num);
  div.id = "numero" + num;
  div.innerHTML = num;
  div.setAttribute("onclick", "mudar(" + num + ")");
  document.querySelector("#resultadoCartela").appendChild(div);
});
