import { ITodoProvider } from "./interfaces";
import ApiWrapper from "./ApiWrapper";
export default class TodoProvider extends ApiWrapper implements ITodoProvider {
    constructor() {
        super();
        console.log('todoProvider');
    }

    getAllTodos() {
        return window.fetch(`${this.host}/getAll`)
        .then((response) => {
            return response.json();
          }).catch((error) => {
              return error;
          })
    }

    getTodo(id) {
        return window.fetch(`${this.host}/edit/${id}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
          }).then((response) => {
            return response.json();
          }).catch((error) => {
              return error;
          })
    }

    deleteTodo(id){
        return window.fetch(`${this.host}/delete/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          })
          .then(response => response.json())
          .catch((error) => {
            return error;
        })
    }

    updateTodo(todo) {
        return window.fetch(`${this.host}/edit/${todo.id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
          }).then(response => response.json())
          .catch((error) => {
            return error;
        })
    }

    addTodo(todo) {
        return window.fetch(`${this.host}/add`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
          }).then(response => response.json())
          .catch((error) => {
            return error;
        })
    }
}