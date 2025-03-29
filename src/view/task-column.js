import {createElement, loadStylesheet} from '../render.js';
import {Status, StatusLabel} from "../enum/status.js";

function createTaskColumnComponentTemplate(status) {
    return (
        `<div class="status ${Status[status]}">
            <h3>${StatusLabel[Status[status]]}</h3>            
        </div>`
    );
}

export default class TaskColumnComponent {
    #status = null;

    constructor({status: status}) {
        this.#status = status;

        loadStylesheet('css/view/task-column.css');
        loadStylesheet(`css/property/${Status[this.#status]}.css`);
    }

    getTemplate() {
        return createTaskColumnComponentTemplate(this.#status);
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
