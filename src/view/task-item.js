import {createElement, loadStylesheet} from '../render.js';

function createTaskItemComponentTemplate(text) {
    return (
        `<div class="outer">
            <div class="inner">${text}</div>
        </div>`
    );
}

export default class TaskItemComponent {
    constructor(text) {
        this.text = text;
        loadStylesheet('css/view/task-item.css');
    }

    getTemplate() {
        return createTaskItemComponentTemplate(this.text);
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
