import {createElement, loadStylesheet} from '../render.js';

function createTaskItemComponentTemplate(task) {
    const {name} = task;
    return (
        `<div class="outer">
            <div class="inner">${name}</div>
        </div>`
    );
}

export default class TaskItemComponent {
    constructor({task}) {
        this.task = task;
        loadStylesheet('css/view/task-item.css');
    }

    getTemplate() {
        return createTaskItemComponentTemplate(this.task);
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
