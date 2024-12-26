//Seleção de elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#export-notes");

//Funções

function showNotes() {
    cleanNotes();
    //getNotes() retorna um array
    //por isso pode ser utilizado o forEach
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);
        notesContainer.appendChild(noteElement);
    });
};

function cleanNotes() {
    notesContainer.replaceChildren([]);
    //passa uma lista vazia ao container de notes
};

function addNote() {
    const notes = getNotes();

    const noteObject = {
        id: generateID(),
        content: noteInput.value,
        fixed: false
    }

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);
    
    notes.push(noteObject);

    saveNotes(notes);
    
    noteInput.value ="";
};

function generateID() {
    return Math.floor(Math.random() * 5000);
};

function createNote(id, content, fixed) {
    const element = document.createElement("div");
    element.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.placeholder = "Adicione algum texto...";

    element.appendChild(textarea);

    if (fixed) {
        element.classList.add("fixed");
    }

    const pinIcon = document.createElement("i");
    pinIcon.classList.add(...["bi", "bi-pin"]);
    element.appendChild(pinIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add(...["bi", "bi-x-lg"]);
    element.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i");
    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);
    element.appendChild(duplicateIcon);

    //Evento de atualizar nota
    element.querySelector("textarea").addEventListener("keyup", (e) => {
        const noteContent = e.target.value;
        updateNote(id, noteContent);
    });

    //Evento do elemento pinIcon
    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    });

    //Evento do elemento deleteIcon
    element.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, element);
    });

    //Evento do elemento duplicateIcon
    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        copyNote(id);
    });

    return element;
};

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id === id)[0];
    //coleta apenas a nota com o id passado por parâmetro
  
    targetNote.content = newContent; //Atualiza o conteúdo
  
    saveNotes(notes); //salva na local storage
}

function toggleFixNote(id) {
    const notes = getNotes();
    const targetNotes = notes.filter((note) => note.id === id)[0];
    //como o id é unico retona o elemento da posição [0]
    //caso seja o id correspondente

    targetNotes.fixed = !targetNotes.fixed;

    saveNotes(notes);
    showNotes();
};

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);
    //as notas que permanecem são as notas que possuem o id
    //diferente do id passado pelo parâmetro
    //excluindo a nota com id igual

    saveNotes(notes); //salva na local storage

    notesContainer.removeChild(element);
    //remove o elemento
};

function copyNote(id) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id === id)[0];
    //pega o elemento [0] que retornou pq o id único retorna somente 1 elemento

    const noteObject = {
        id: generateID(),
        content: targetNote.content,
        fixed: false,
    }; //duplica a nota com um novo id

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);
    notesContainer.appendChild(noteElement);
    //insere a nota duplicada no container de notas 

    //inserindo na local storage
    notes.push(noteObject);
    saveNotes(notes);
};

function searchNotes(search) {

    const searchResults = getNotes().filter((note) => {
        return note.content.includes(search);
    });

    if (search !== ""){
        cleanNotes();
        searchResults.forEach((note) => {
            const noteElement = createNote(note.id, note.content);
            notesContainer.appendChild(noteElement);
        });
        
        return;
    }

    cleanNotes();
    showNotes();

};

function exportData() {
    const notes = getNotes();
    //criar padrão csv
    //separa os dados por , e quebra linha com \n
    //também precisa o título da coluna 
    const csvString = [
        ["ID", "Conteúdo", "Fixado"],
        ...notes.map((note) => [note.id, note.content, note.fixed]),
    ].map((e) => e.join(",")).join("\n");

    const element = document.createElement("a");
    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
    element.target = "_blank";
    element.download = "Notes.csv";
    element.click();
};

//local storage
function getNotes() {
    //faz um casting para o formato JSON
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    //ou pega as notas ou um array vazio 

    //ordenando as notas fixas
    const orderedNotes = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1);

    return orderedNotes;
};

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
};

//Eventos

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
    searchNotes(search);
});

addNoteBtn.addEventListener("click", () => addNote());

noteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addNote();
    }
});

exportBtn.addEventListener("click", () => {
    exportData();
});

//Inicialização 
showNotes();