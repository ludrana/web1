import {createElement, loadStylesheet} from '../render.js';

function createTaskBoardComponentTemplate() {
    return (
        `<div class="task-list"></div>`
    );
}

export default class TaskBoardComponent {
    constructor() {
        loadStylesheet('css/view/task-board.css');
    }

    getTemplate() {
        return createTaskBoardComponentTemplate();
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
