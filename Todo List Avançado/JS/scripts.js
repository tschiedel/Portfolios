// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;


// Funções
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text; //recebe o cinteudo da tarefa(todo)
    todo.appendChild(todoTitle); //insere o h3 na div já preenchido

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    //utilizando dados da local storage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({text, done});
    }

    todoList.appendChild(todo);
    todoInput.value = ""; //Limpa o campo input depos de enviar o todo preenchido
    todoInput.focus(); //já deixa o foco no input pro usuário não precisar clicar pra digitar a próxima nota
};

//esta função oculta todos os elementos desnecessários para a edição do todo
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo"); //cria a lista com todos os todos para atualizar somente o editado
    
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3"); //pega o titula atual do loop

        if (todoTitle.innerText === oldInputValue){ //encontra o todo certo e altera o texto
            todoTitle.innerText = text;
            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};

const getSearchTodo = (search) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        //consgue buscar independente de letra minúscula ou maiúscula
        const normalizeSearch = search.toLowerCase();
        todo.style.display = "flex";
        //faz com que volte a aparecer as notas quando apaga o texto de busca do input
        if (!todoTitle.includes(normalizeSearch)) {
            todo.style.display = "none";
            //oculta qualquer todo que não corresponda a busca
        };
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
    
    switch (filterValue) {
        case "all":
            todos.forEach((todo) => todo.style.display = "flex"); //mostra todos os todo
            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? todo.style.display = "flex" //caso tenha
                    : todo.style.display = "none" //caso não tenha
            );
            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? todo.style.display = "flex" //caso tenha
                    : todo.style.display = "none" //caso não tenha
            );
            break;

        default: 
            break;
    }
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputValue = todoInput.value;

    if (inputValue) {
        //console.log(inputValue); //verifica o valor da nota
        //Save todo
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target; //identifica em qual elemento o user clicou
    const parentEl = targetEl.closest("div"); //identifica a div pai do elemento clicado
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) { //verifica se o local clicado é o botão com a classe de finish-todo
        parentEl.classList.toggle("done"); //adiciona ou remove a classe de cor para a tarefa feita
        todoUpdateStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("remove-todo")) { //verifica se o botão clicado é o botão com a classe de remove-todo
        parentEl.remove(); //remove toda a div contendo a tarefa(todo)
        removeTodoLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("edit-todo")) { //verifica se o botão clicado é o botão com a classe de edit-todo
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle
    }

});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(); //chama a função toggle forms para voltar ao normal
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editInputValue = editInput.value; //salva o novo valor do todo após a edição

    if (editInputValue) { //se estiver vazio cancela a edição
        //Atualizar
        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value; //pega o valor da busca
    getSearchTodo(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup")); //dispara um evento para as notas aparecerem
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterTodos(filterValue);
});

//Local storage

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
    //salvando os todos no array atual 
    todos.push(todo); 
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoTitle) => {
    const todos = getTodosLocalStorage();
    const filteredTodos = todos.filter((todo) => todo.text !== todoTitle);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const todoUpdateStatusLocalStorage = (todoTitle) => {
    const todos = getTodosLocalStorage();
    todos.map((todo) => 
        todo.text === todoTitle 
        ? (todo.done = !todo.done) 
        : null
    );//o map não retorna dados, mas sim modifica eles 
    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();
    todos.map((todo) => 
        todo.text === todoOldText 
        ? (todo.text = todoNewText) 
        : null
    );//o map não retorna dados, mas sim modifica eles 
    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();

