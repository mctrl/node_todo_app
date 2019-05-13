export interface ITodo
{
    id: number,
    title: string,
    description: string,
    created?: string,
    username?: string

}

export interface IMessage
{
    error?: string,
    message?: string
}

export interface ITodoProvider {
    getAllTodos(): Promise<any>;
    getTodo(id: number): Promise<any>;
    addTodo(todo: ITodo): Promise<any>;
    deleteTodo(id: number):Promise<any>
    updateTodo(todo: ITodo): Promise<any>
}
