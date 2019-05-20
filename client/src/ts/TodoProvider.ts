import { ITodoProvider } from "./interfaces";
import ApiWrapper from "./ApiWrapper";
export default class TodoProvider extends ApiWrapper implements ITodoProvider {
    constructor() {
        super();
    }

    getAllTodos(): Promise<any> {
        return this.get(`getAll`);
    }

    getTodo(id): Promise<any> {
        return this.get(`edit/${id}`)
    }

    deleteTodo(id): Promise<any> {
        return this.delete(`delete/${id}`)
    }

    updateTodo(todo): Promise<any> {
        return this.update(`edit/${todo.id}`,todo)
    }

    addTodo(todo): Promise<any> {
        return this.post(`add`, todo)
    }
}