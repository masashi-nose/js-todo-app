import { App } from './src/App.js';

const formElement = document.querySelector("#js-form");
console.log(formElement);
const formInputElement = document.querySelector("#js-form-input");
console.log(formInputElement);
const todoCountElement = document.querySelector("#js-todo-count");
console.log(todoCountElement);
const todoListContainerElement = document.querySelector("#js-todo-list");
console.log(todoListContainerElement);


const app = new App({
    formElement,
    formInputElement,
    todoListContainerElement,
    todoCountElement
});

window.addEventListener("load", () => {
    app.mount();
});

window.addEventListener("unload", () => {
    app.unmount(); 
});

