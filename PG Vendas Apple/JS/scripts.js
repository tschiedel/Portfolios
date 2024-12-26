const buttons = document.querySelectorAll("#image-picker li");
const image = document.querySelector("#product-image");


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //console.log(e);
        buttons.forEach((btn) => {
            btn.querySelector(".color").classList.remove("selected");
        });
    
        const button = e.target;
        const id = button.getAttribute("id"); //identifica o id do botão selecinado
        //console.log(id);

        button.querySelector(".color").classList.add("selected"); //atribui a classe selecionada para a cor

        image.classList.add("changing"); //adiciona classe changing
        image.setAttribute("src", `IMG/iphone_${id}.jpg`); // troca a imagem de acordo com a cor

        setTimeout(() => {
            image.classList.toggle("changing");
        }, 200);
    });
});