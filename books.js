const submitButton = document.querySelector("#submit");
const addEntryButton = document.querySelector("#add-entry");
const bookInfo = document.querySelector(".add-book");
let book = [];

function Book(name, author, pages, haveRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addToLibrary(newBook) {
    book.push(newBook);
    render(newBook);
}

function render(newBook) {
    const table = document.querySelector("table");
    const newRow = table.insertRow();
    const deleteCell = newRow.insertCell();
    const titleCell = newRow.insertCell();
    const authorCell = newRow.insertCell();
    const pagesCell = newRow.insertCell();
    const haveReadCell = newRow.insertCell();
    const changeStatusCell = newRow.insertCell();

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "\u2212";
    deleteCell.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteRow);

    const changeStatusButton = document.createElement("button");
    if(newBook.haveRead){
        changeStatusButton.innerText = "\u2718";
    }else {
        changeStatusButton.innerText = "\u2714";
    }
    changeStatusCell.appendChild(changeStatusButton);
    changeStatusButton.addEventListener("click", function() {
        newBook.haveRead = !newBook.haveRead;
        if(newBook.haveRead){
            changeStatusButton.innerText = "\u2718";
        }else {
            changeStatusButton.innerText = "\u2714";
        }
        haveReadCell.innerText = newBook.haveRead? "Read" : "Not read";
    });

    titleCell.innerText = newBook.name;
    authorCell.innerText = newBook.author;
    pagesCell.innerText = newBook.pages
    haveReadCell.innerText = newBook.haveRead? "Read" : "Not read";
}

function deleteRow() {
    const row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
}


function newEntry() {
    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newPages = document.getElementById("pages").value;
    const newReadStatus = document.getElementById("have-read").checked? true : false;

    if(newTitle === "" || newAuthor === "" || newPages === "") {
        alert("Check missing fields!");
        return;
    }

    if(isNaN(parseInt(newPages))){
        alert("Invalid page number");
        return;
    }
    addToLibrary(new Book(newTitle, newAuthor, newPages, newReadStatus));
    clearInputs();
}

function clearInputs() {
    const inputValues = document.querySelectorAll("input");
    const radioButtons = document.querySelectorAll("input[type=radio]");
    inputValues.forEach(input => {
        if(input.value){
            input.value = "";
        }
    });

    radioButtons.forEach(box => box.checked = false);
    toggleVisibility();
}

function toggleVisibility() {
    if (addEntryButton.textContent === "\u002B"){
        addEntryButton.textContent = "\u2212"; //minus symbol
    }else {
        addEntryButton.textContent = "\u002B"; //minus symbol
    }
    bookInfo.classList.toggle("visible");
}

addToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", "218", false));
addToLibrary(new Book("War and Peace", "Leo Tolstoy", "1,225", false));

submitButton.addEventListener("click", newEntry);
addEntryButton.addEventListener("click", toggleVisibility);