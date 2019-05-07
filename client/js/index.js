var App = /** @class */ (function () {
    function App() {
        this.init();
    }
    App.prototype.init = function () {
        this.cacheDom();
        this.bindEventListeners();
        this.refreshList();
    };
    App.prototype.cacheDom = function () {
        this.el = document.getElementById('todoList');
        this.searchBox = document.getElementById('searchBox');
        this.addButton = document.getElementById('add-btn');
        this.addEditModal = document.getElementById('addEditModal');
        this.messageBar = document.getElementById('messageBar');
        this.saveButton = this.addEditModal.querySelector('#saveTodo');
        this.todoDescriptionInput = this.addEditModal.querySelector('#description-text');
    };
    App.prototype.refreshList = function () {
        var _this = this;
        this.fetchData().then(function (data) {
            if (!data.error) {
                _this.todos = data;
                _this.render(_this.todos);
            }
            else {
                _this.setMessage(data);
            }
        });
    };
    App.prototype.bindEventListeners = function () {
        this.searchBox.addEventListener('keyup', this.searchTodo.bind(this));
        this.addButton.addEventListener('click', this.addTodo.bind(this));
        this.saveButton.addEventListener('click', this.saveTodo.bind(this));
        this.todoDescriptionInput.addEventListener('keyup', this.enableSave.bind(this));
    };
    App.prototype.enableSave = function (event) {
        this.saveButton.disabled = event.currentTarget.value ? false : true;
    };
    App.prototype.fetchData = function () {
        return window.fetch('http://localhost:3000/getAll').then(function (response) {
            return response.json();
        })["catch"](function (error) {
            return error;
        });
    };
    App.prototype.render = function (todoList) {
        var _this = this;
        this.el.innerHTML = '';
        todoList.forEach(function (todo) {
            var li = _this.createTodoElement(todo);
            _this.el.append(li);
        });
    };
    App.prototype.createTodoElement = function (item) {
        var li = document.createElement('li');
        li.innerHTML = "\n        " + (item.title ? '<strong>' + item.title + ': </strong>' : '') + "\n        " + item.description + " - <i> " + item.username + " </i>\n        <button class=\"btn btn-secondary edit-btn\">Edit</button>\n        <button class=\"btn btn-danger delete-btn\">Delete</button>";
        li.setAttribute('data-id', item.id.toString());
        li.querySelector('.edit-btn').addEventListener('click', this.editTodo.bind(this));
        li.querySelector('.delete-btn').addEventListener('click', this.deleteTodo.bind(this));
        return li;
    };
    App.prototype.setMessage = function (data) {
        this.messageBar.innerHTML = "<div class=\"alert alert-" + (data.error ? 'danger' : 'success') + " alert-dismissible fade show\" role=\"alert\">\n      " + (data.error ? data.error : data.message) + "\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>";
    };
    App.prototype.editTodo = function (event) {
        var _this = this;
        this.addEditModal.querySelector('.modal-title').innerHTML = 'Edit Todo';
        var id = event.currentTarget.parentNode.dataset.id;
        window.fetch('http://localhost:3000/edit/' + id, {
            method: "GET"
        }).then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.error) {
                _this.setMessage(data);
            }
            else {
                _this.populateModal(data[0]);
            }
        })["catch"](function (data) { return console.log(data); });
    };
    App.prototype.populateModal = function (todo) {
        this.addEditModal.querySelector('#todo-id').value = todo.id.toString();
        this.addEditModal.querySelector('#title-name').value = todo.title;
        this.addEditModal.querySelector('#description-text').value = todo.description;
        this.todoDescriptionInput.dispatchEvent(new Event('keyup'));
        $('#addEditModal').modal('show');
    };
    App.prototype.deleteTodo = function (event) {
        var _this = this;
        var id = event.currentTarget.parentNode.dataset.id;
        window.fetch('http://localhost:3000/delete/' + id, {
            method: "DELETE"
        }).then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setMessage(data);
            _this.refreshList();
        })["catch"](function (data) { return console.log(data); });
    };
    App.prototype.addTodo = function (event) {
        this.addEditModal.querySelector('.modal-title').innerHTML = 'Add New Todo';
        $('#addEditModal').modal('show');
    };
    App.prototype.saveTodo = function () {
        var _this = this;
        var todo = {
            id: parseInt(this.addEditModal.querySelector('#todo-id').value),
            title: this.addEditModal.querySelector('#title-name').value,
            description: this.addEditModal.querySelector('#description-text').value
        };
        if (todo.id) {
            window.fetch('http://localhost:3000/edit/' + todo.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                $('#addEditModal').modal('hide');
                _this.setMessage(data);
                _this.refreshList();
            })["catch"](function (data) { return console.log(data); });
        }
        else {
            window.fetch('http://localhost:3000/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                $('#addEditModal').modal('hide');
                _this.setMessage(data);
                _this.refreshList();
            })["catch"](function (data) { return console.log(data); });
        }
        // clear input values;
        this.addEditModal.querySelector('#todo-id').value = '';
        this.addEditModal.querySelector('#title-name').value = '';
        this.addEditModal.querySelector('#description-text').value = '';
    };
    App.prototype.searchTodo = function (event) {
        var filteredTodos = this.todos.filter(function (todo) { return todo.description.toLowerCase().match(event.currentTarget.value.toLowerCase()); });
        this.render(filteredTodos);
    };
    return App;
}());
window.onload = function () {
    var app = new App();
};
