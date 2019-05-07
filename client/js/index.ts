// create errorHandling helper to deal with success and error messages
interface ITodo {
  id: number,
  title: string,
  description: string,
  created?: string,
  username?: string
  
}

interface IMessage {
  error?:string,
  message?:string
}

class App {
    private el: HTMLElement;
    private searchBox: HTMLElement;
    private addButton: HTMLElement;
    private addEditModal: HTMLElement;
    private messageBar: HTMLElement;
    private saveButton: HTMLButtonElement;
    private todoDescriptionInput: HTMLElement;
    private todos: Array<ITodo>;
    constructor(){
        this.init();
    }
    init():void {
        this.cacheDom();
        this.bindEventListeners();
        this.refreshList();
        
    }
    cacheDom(): void {
        this.el = document.getElementById('todoList');
        this.searchBox = document.getElementById('searchBox');
        this.addButton = document.getElementById('add-btn');
        this.addEditModal = document.getElementById('addEditModal');
        this.messageBar = document.getElementById('messageBar');
        this.saveButton = this.addEditModal.querySelector('#saveTodo');
        this.todoDescriptionInput = this.addEditModal.querySelector('#description-text');
    }
    refreshList(): void {
      this.fetchData().then(data => {
        if (!data.error) {
          this.todos = data;
          this.render(this.todos);
        } else{
          this.setMessage(data)
        }
      });
    }

    bindEventListeners():void {
      this.searchBox.addEventListener('keyup', this.searchTodo.bind(this));
      this.addButton.addEventListener('click', this.addTodo.bind(this) )
      this.saveButton.addEventListener('click', this.saveTodo.bind(this) )
      this.todoDescriptionInput.addEventListener('keyup', this.enableSave.bind(this))
    }

    enableSave(event: any): void {
      this.saveButton.disabled = event.currentTarget.value ? false : true;
    }
    fetchData() {
      return window.fetch('http://localhost:3000/getAll').then((response) => {
        return response.json();
      }).catch((error) => {
          return error;
      })
    }

    render(todoList: Array<ITodo>):void {
      this.el.innerHTML = '';
      todoList.forEach((todo: ITodo) => {
            const li = this.createTodoElement(todo);
            this.el.append(li);
        })
    }

    createTodoElement(item: ITodo):HTMLElement {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.title ? '<strong>'+ item.title +': </strong>' : ''}
        ${item.description} - <i> ${item.username} </i>
        <button class="btn btn-secondary edit-btn">Edit</button>
        <button class="btn btn-danger delete-btn">Delete</button>`;
      li.setAttribute('data-id', item.id.toString());
      li.querySelector('.edit-btn').addEventListener('click', this.editTodo.bind(this));
      li.querySelector('.delete-btn').addEventListener('click', this.deleteTodo.bind(this));
      return li;
    }

    setMessage(data: IMessage):void {
      this.messageBar.innerHTML =`<div class="alert alert-${data.error ? 'danger': 'success'} alert-dismissible fade show" role="alert">
      ${data.error ? data.error : data.message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }

    editTodo(event: any):void {
        this.addEditModal.querySelector('.modal-title').innerHTML = 'Edit Todo';
        const id = event.currentTarget.parentNode.dataset.id;
        window.fetch('http://localhost:3000/edit/'+id, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
          }).then(response => response.json())
          .then(data => {
            if (data.error) {
              this.setMessage(data);
            } else {
              this.populateModal(data[0]);
            }
          })
          .catch(data => console.log(data));
    }

    populateModal(todo: ITodo) {
      (<HTMLInputElement>this.addEditModal.querySelector('#todo-id')).value = todo.id.toString();
      (<HTMLInputElement>this.addEditModal.querySelector('#title-name')).value = todo.title;
      (<HTMLInputElement>this.addEditModal.querySelector('#description-text')).value = todo.description;
      this.todoDescriptionInput.dispatchEvent(new Event('keyup'))
      $('#addEditModal').modal('show');
    }
    deleteTodo(event: any):void {
      const id = event.currentTarget.parentNode.dataset.id;
      window.fetch('http://localhost:3000/delete/'+id, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        }).then(response => response.json())
        .then(data => {
          this.setMessage(data);
          this.refreshList();
        })
        .catch(data => console.log(data));
    }

    addTodo(event: any): void {
      this.addEditModal.querySelector('.modal-title').innerHTML = 'Add New Todo';
      $('#addEditModal').modal('show')
    }

    saveTodo():void {
      var todo: ITodo = {
        id: parseInt((<HTMLInputElement>this.addEditModal.querySelector('#todo-id')).value),
        title: (<HTMLInputElement>this.addEditModal.querySelector('#title-name')).value,
        description: (<HTMLInputElement>this.addEditModal.querySelector('#description-text')).value
      }
      if (todo.id) {
        window.fetch('http://localhost:3000/edit/'+todo.id, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
          }).then(response => response.json())
          .then(data => {
              $('#addEditModal').modal('hide')
              this.setMessage(data);
              this.refreshList();
          })
          .catch(data => console.log(data));
      } else {
        window.fetch('http://localhost:3000/add', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todo)
          }).then(response => response.json())
          .then(data => {
            $('#addEditModal').modal('hide')
            this.setMessage(data);
            this.refreshList();
          })
          .catch(data => console.log(data));
      }
      // clear input values;
      (<HTMLInputElement>this.addEditModal.querySelector('#todo-id')).value = '';
      (<HTMLInputElement>this.addEditModal.querySelector('#title-name')).value = '';
      (<HTMLInputElement>this.addEditModal.querySelector('#description-text')).value = '';

    }

    searchTodo(event: any):void {
      var filteredTodos = this.todos.filter((todo: ITodo) => todo.description.toLowerCase().match(event.currentTarget.value.toLowerCase()))
      this.render(filteredTodos);
    }

}

window.onload = () => {
    let app = new App();
}

