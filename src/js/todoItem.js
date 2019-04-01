/**
 * Todo Item factory
 */
const TodoItem = (function () {
    let ID = 0;
    _element = null;
    return class TodoItem {
        _done = false;
        _element = null;
        _icon = null;

        constructor (text = '', done = false) {
            // validation
            if(typeof text !== 'string')
                throw new Error(`Invalid text: ${text}`);

            // todo item
            this.id = ID++;
            this.text = text;
            this.done = done;
        }

        /**
         * Getter method for the element
         * Compose the LI element if does not exist
         * Returns the LI element if already exist
         * @returns {HTMLElement}
         */
        get element () {
            if(!this._element){
                // compose the todo item
                this._element = document.createElement('li');
                this._element.classList.add('collection-item');
                this._element.innerText = this.text;
                this._element.draggable = true;
                this._element.setAttribute('data-id', this.id);
                this._element.appendChild(this.icon);
            }
            return this._element;
        }

        /**
         * Getter method for the todo icon
         * @returns {HTMLElement}
         */
        get icon () {
            if(!this._icon) {
                // compose the todo icon
                this._icon = document.createElement('i');
                this._icon.classList.add('material-icons', 'left');
                this._iconText();
            }
            return this._icon;
        }

        /**
         * Compose the icon text based on the done state of the todo
         * @private
         */
        _iconText () {
            this._icon.innerText = this.done
                ? 'check_circle_outline'
                : 'panorama_fish_eye';
        }

        get done () {
            return this._done;
        }

        /**
         * Setter method to set the todo done state
         * @param {boolean} value
         */
        set done (value) {
            if(typeof value !== 'boolean')
                throw new Error(`Invalid done value: ${value}`);
            this._done = value;

            // update the icon if exist
            if (this._icon) this._iconText();
        }
    }
})();