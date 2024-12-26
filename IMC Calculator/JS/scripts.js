// IMC DATA (Array de Objetos)
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

//Selecionando elementos
const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const clearBtn = document.querySelector("#clear-btn");
const calcBtn = document.querySelector("#calc-btn");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

//Funções

// **tabela com dados do array**
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    //Preenche cada elemento p com o texto correspondente vindo do array de objetos
    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    //Insere novos elementos "p" dentro do elemento "div" criado
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    //Insere o elemento "div" na tabela
    imcTable.appendChild(div);
  });
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, ""); //Permite o usuário preencher o campo apenas com números e vírgula
  // o "g" quer dizer que é global, ou seja, além da primeira repetição.
  // os aspas substituem qualquer outra ocorrência por vazio. 
}

function calcImc(weight, height) {
  const imc = (weight/(height * height)).toFixed(1); 
  //Calcula o IMC mas gera um número quebrado que pode ser extenso
  //por isso é utlizado o ().toFixed(1) para limitar 1 casa após o ponto
  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
  //esta função faz com que a classe "hide" seja removida quando o elemento já possua a mesma 
  //ou insere a classe se não tiver.
}

//Inicializando

createTable(data);

//Eventos

clearBtn.addEventListener("click", (e) => {
  e.preventDefault(); //Evita que o formulário seja enviado.
  cleanInputs();
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Fazer a troca de , para . porque js utiliza o . para numeros com float
  //o + faz a conversão de texto para numérico
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  //verifica se os campos estão vazios, se estiverem retorna.
  if (!weight || !height) return;

  const imc = calcImc(weight, height);
  
  let info;
  //verfica qual a avaliação do imc do usuário
  data.forEach((item) => {
    if(imc >= item.min && imc <= item.max){
      info = item.info;
    }
  });

  if (!info) return; //retona se o usuário digitou valores malucos

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  showOrHideResults();

  switch(info){
    case "Magreza" :
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal" :
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso" :
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade" :
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave" :
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

});

backBtn.addEventListener("click", () => { //não precisa acrescentaro "e" pq não etá dentro de um formulário
  cleanInputs(); //limpa os inputs para voltar 
  showOrHideResults(); //muda a classe "hide" e volta para o elemento anterior
});

//evento de validação para digitar somente números e vírgula
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => { // O evento "input" e ativado quando qualquer coisa é digitada
    const updateValue = validDigits(e.target.value); // e.taget.value possibilita coletar o valor por meio do target
    e.target.value = updateValue; //recursivo para cada dígito
  });
});
