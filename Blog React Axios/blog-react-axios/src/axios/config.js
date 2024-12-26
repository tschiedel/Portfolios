import axios from "axios";

//configuração de base url

const blogFetch = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type" : "application/json",
    },
});

export default blogFetch;