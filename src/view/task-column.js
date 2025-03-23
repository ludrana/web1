import {createElement, loadStylesheet} from '../render.js';

function createTaskColumnComponentTemplate(text, className) {
    return (
        `<div class="status ${className}">
            <h3>${text}</h3>            
        </div>`
    );
}

export default class TaskColumnComponent {
    constructor(text, className) {
        this.text = text;
        this.className = className;

        loadStylesheet('css/view/task-column.css');
        loadStylesheet(`css/property/${className}.css`);
    }

    getTemplate() {
        return createTaskColumnComponentTemplate(this.text, this.className);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
