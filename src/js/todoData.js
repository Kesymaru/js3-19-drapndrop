/**
 * Todo singleton
 */
const TodoData = (function () {
    // private data
    const DATA = [];

    let instance = null;

    return class TodoData {
        static Subscriptions = Object.freeze({
            'TODO_ADDED': Symbol('TODO_ADDED'),
        });

        constructor () {
            if(instance) instance = this;
            return instance;
        }

        /**
         * Returns the todo list
         * @returns {Array}
         */
        get todo () {
            return DATA.filter(i => !i.done);
        }

        /**
         * Returns the done list
         * @returns {Array}
         */
        get done () {
            return DATA.filter(i => i.done);
        }

        /**
         * Finds a todo list
         * @param {number} id
         * @returns {null|array}
         */
        get(id) {
            return DATA.find(item => item.id == id);
        }

        /**
         * Add a new todo
         * @param {TodoItem} todo
         */
        add (todo) {
            if(!todo || !(todo instanceof TodoItem))
                throw new Error(`Invalid todo: ${todo}`);

            // add the todo
            DATA.push(todo);
            Mediator.Publish(TodoData.Subscriptions.TODO_ADDED, todo);
        }

        /**
         * Remove a todo
         * @param {TodoItem} todo
         */
        remove (todo) {
            let idx = DATA.findIndex(i => i === todo);
            if(idx > -1) DATA.splice(idx, 1);
        }
    }
})();