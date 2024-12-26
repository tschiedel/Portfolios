//Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

//Novas funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

//Funções

//Letras, números e símbolos
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    //Math.random() gera resultados quebrados
    //Math.floor() faz com que os resultados sejam inteiros
    //+97 pega letras minúsculas e *26 são todas as letras do alfabeto
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    //Math.random() gera resultados quebrados
    //Math.floor() faz com que os resultados sejam inteiros
    //+65 pega letras minúsculas e *26 são todas as letras do alfabeto
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbol = "(){}=<>/.,!@#$%&*()_+-=?";
    return symbol[Math.floor(Math.random() * symbol.length)];
};

const generatePassword = (
    getLetterLowerCase, 
    getLetterUpperCase, 
    getNumber, 
    getSymbol
) => {

    let password = "";

    //Segunda versão 
    const passwordLength = +lengthInput.value;
    const generators = [];

    if(lettersInput.checked){
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if(numbersInput.checked){
        generators.push(getNumber);
    }

    if(symbolsInput.checked){
        generators.push(getSymbol);
    }

    if(generators.length === 0){
        return;
    }
    ///
    
    

    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        });
    }

    password = password.slice(0, passwordLength);
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};

//Eventos
generatePasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber, 
        getSymbol
    );
});

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    //copiando a senha
    const password = generatedPasswordElement.querySelector("h4").innerText;

    //colando a senha
    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!";

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar";
        }, 1000);
    });
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
    generatedPasswordElement.classList.toggle("hide");
});

