import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  //criar a div contendo informacoes
  //com o total de animais
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");

    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  const preencherAnimais = function (animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  };

  //anima os numeros de cada animal
  const animaAnimaisNumeros = function () {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  };

  //puxa os animais atraves de um arquivo json
  //e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      //fetch espera resposta e transforma a resposta em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //apos a transformacao em json ativa as funcoes
      //para preencher e animar os numeros
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
