/**
 * Todo class to mange the HTML DOM
 */
const Todo = (function () {
    return class Todo {
        todo = null;
        done = null;
        data = new TodoData();

        constructor (container) {
            this.container = document.querySelector(container);

            // subscriptions
            Mediator.Subscribe(TodoData.Subscriptions.TODO_ADDED, this.addTodo.bind(this));

            // render the draggable lists
            this.render();
        }

        /**
         * Render the draggable elements
         */
        render () {
            this._ul('todo');
            this._ul('done');
        }

        /**
         * Compose the ul list
         * @param {string} data
         * @returns {HTMLElement}
         * @private
         */
        _ul (data = 'todo') {
            let col = document.createElement('div');
            col.classList.add('col', 's6');

            let title = document.createElement('h5');
            title.innerText = data;

            let icon = document.createElement('i');
            icon.classList.add('material-icons', 'left');
            icon.innerText = data === 'todo' ? 'panorama_fish_eye' : 'done';
            title.appendChild(icon);

            col.appendChild(title);

            let ul = document.createElement('ul');
            ul.classList.add('collection');

            // add each element of the list
            this.data[data].forEach(todo => this._addTodo(todo, ul));

            col.appendChild(ul);

            // events
            col.addEventListener('drop', this.drop.bind(this));
            col.addEventListener('dragover', this.dragover.bind(this));

            // save the list DOM reference
            this[data] = ul;

            this.container.appendChild(col);
        }

        /**
         * Add a todo to the list DOM
         * @param {TodoItem} todo
         * @param {HTMLElement} ul
         * @returns {HTMLElement}
         * @private
         */
        _addTodo (todo, ul) {
            todo.element.addEventListener('dragstart', this.dragstart);
            ul.appendChild(todo.element);

            return todo.element;
        }

        /**
         * Drop event handler
         * @param {Event} event
         * @returns {boolean}
         */
        drop (event) {
            let id = event.dataTransfer.getData('text');
            let todo = this.data.get(id);
            if(!todo) return false;

            // update the done state
            todo.done = !todo.done;

            // remove the element on the current list
            todo.element.parentNode.removeChild(todo.element);

            // add the todo
            this.addTodo(todo);
        }

        /**
         * Dragover event handler
         * @param {Event} event
         */
        dragover (event) {
            event.preventDefault()
        }

        /**
         * Dragstart
         * @param {Event} event
         */
        dragstart (event) {
            let id = event.target.getAttribute('data-id');
            event.dataTransfer.setData('text', id);
        }

        /**
         * Method when a new todo item is added
         * @param {TodoItem} todo
         */
        addTodo (todo) {
            if(!(todo instanceof TodoItem))
                throw new Error(`Invalid todo item: ${todo}`);

            let ul = todo.done ? this.done : this.todo;
            this._addTodo(todo, ul);
        }
    }
})();