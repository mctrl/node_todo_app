import { ITodoProvider } from "./interfaces";
import ApiWrapper from "./ApiWrapper";
export default class TodoProvider extends ApiWrapper implements ITodoProvider {
    constructor() {
        super();
    }

    getAllTodos() {
        return this.get(`getAll`)
            .then(response => response.json())
            .catch((error) => new Object({error: error}));
    }

    getTodo(id) {
        return this.get(`edit/${id}`)
            .then(response => response.json())
            .catch((error) => new Object({error: error}));
    }

    deleteTodo(id) {
        return this.delete(`delete/${id}`)
            .then(response => response.json())
            .catch((error) => new Object({error: error}));
    }

    updateTodo(todo) {
        return this.update(`edit/${todo.id}`,todo)
            .then(response => response.json())
            .catch((error) => new Object({error: error}));
    }

    addTodo(todo) {
        return this.post(`add`, todo)
            .then(response => response.json())
            .catch((error) => new Object({error: error}));
    }
}