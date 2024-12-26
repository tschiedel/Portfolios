const images = document.querySelectorAll(".image-container img");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        const image = entry.target;
        image.src = image.src.replace("w=10&", "w=1000&");

        observer.unobserve(image);// faz a imagem mudar só uma vez
    });
}, {}); // Como não precisa de nenhuma inoformação é só passar um obj vazio

images.forEach((image) => {
    observer.observe(image);
});