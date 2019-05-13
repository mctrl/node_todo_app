// export class Todo {
//     constructor(todo: any) {
//         console.log('inside todo', todo);
//     }
// } 

// class Todo {
//   private element: ITodo;
//   private parentElement: any;
//   constructor(todo: ITodo, parent: any) {
//       this.element = todo;
//       this.parentElement = parent;
//       this.init();
//   }
//   init():void {
//     //add get template function to get template from outside then extend this class with a widget/component function 
//     fetch('../templates/todo.html').then((response) => {
//       console.log(response.text);
//         // this.createElement(template);
//     })
//   }

//   createElement(template: any): void {
//     // let li = document.createElement('li');
//     // li.innerHTML = this.element.title;
//     // this.bindEleventListeners(li);
//     template.getQuerySelector('.todo_item').innerHTML(this.element.title);
//     this.parentElement.appendChild(template);
//   }

//   bindEleventListeners(todoItem: any): void {
//     todoItem.addEventListener('click', (event: any) => {
//       alert(`clicked! ${event.target.innerHTML}`)
//     })
//   }
// } 

        // window.fetch('http://localhost:3000/getAll')
        // .then((response) => {
        //     console.log(response.json());
        //     this.renderTodos();
        // })
        // .catch((error) => {
        //     console.log('error', error);
        // })

        // private todos: Array<ITodo> =[
        //         {
        //           "id": 1,
        //           "title": "sometitle updated",
        //           "description": "this is the first test for todo UPDATED",
        //           "created": "2019-04-27T15:07:48.000Z",
        //           "username": "martina"
        //         },
        //         {
        //           "id": 6,
        //           "title": "",
        //           "description": "this is a todo added from postman 4",
        //           "created": "2019-04-27T13:46:17.000Z",
        //           "username": "martina"
        //         },
        //         {
        //           "id": 5,
        //           "title": "cccccccccc",
        //           "description": "this is a todo added from postman 3",
        //           "created": "2019-04-27T13:46:08.000Z",
        //           "username": "martina"
        //         },
        //         {
        //           "id": 4,
        //           "title": "bbbbbbb",
        //           "description": "this is a todo added from postman 2",
        //           "created": "2019-04-27T13:44:47.000Z",
        //           "username": "martina"
        //         },
        //         {
        //           "id": 3,
        //           "title": "aaaaaaaa",
        //           "description": "this is a todo added from postman",
        //           "created": "2019-04-27T13:36:35.000Z",
        //           "username": "martina"
        //         }
        //       ]