(function () {
    const DATA = new TodoData;

    let todo = null;
    let addElement = null;

    /**
     * Main program
     * init the todos
     */
    function main () {
        let todo = new Todo('section');

        let addElement = document.querySelector('#addTodo');
        addElement.addEventListener('click', addTodo);
    }

    /**
     * Method to show the dialog to add a new todo
     */
    function addTodo () {
        let form = _addTodoForm();

        let dialog = new Dialog({
            title: 'Add new Todo',
            content: form,
            open: true,
            onSave: onSave.bind({form}),
        });
        dialog.promise
            .then(data => DATA.add(new TodoItem(data.text, data.done)))
            .catch(err => console.log('dialog closed'));

        // method called on save dialog
        function onSave (resolve, reject) {
            let text = this.form.text.value;
            let done = this.form.done.checked;
            if(!text) return false;
            dialog.close();
            resolve({text, done});
        }
    }

    /**
     * Compose the add todo dialog
     * @returns {HTMLElement}
     * @private
     */
    function _addTodoForm () {
        let form = document.createElement('form');

        form.appendChild(_input('text', 'text'));
        form.appendChild(_input('checkbox', 'done'));

        return form;
    }

    /**
     * Compose an input for the add todo form
     * @param type
     * @param name
     * @returns {HTMLElement}
     * @private
     */
    function _input (type, name) {
        let row = document.createElement('div');
        row.classList.add('row');

        let input = document.createElement('input');
        input.id = name;
        input.type = type;
        input.name = name;

        if(type === 'checkbox') {
            let label = document.createElement('label');
            label.setAttribute('for', name);

            let span = document.createElement('span');
            span.innerText = 'Done';

            label.appendChild(input);
            label.appendChild(span);

            row.appendChild(label);
        }
        else row.appendChild(input);

        return row;
    }

    // init
    main();
})();