import {createElement, loadStylesheet} from '../render.js';

function createNewTaskComponentTemplate() {
    return (
        `<label for="new-task-input">
            Новая задача
            <input id="new-task-input" type="text" placeholder="Название задачи...">
        </label>
        <button class="btn">+ Добавить</button>`
    );
}

export default class NewTaskComponent {
    constructor() {
        loadStylesheet('css/view/new-task.css')
    }

    getTemplate() {
        return createNewTaskComponentTemplate();
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
