import {loadStylesheet} from '../render.js';
import {StatusLabel} from "../enum/status.js";
import {AbstractComponent} from "./abstract-component.js";

function createTaskColumnComponentTemplate(status) {
    return (
        `<div class="status ${status}">
            <h3>${StatusLabel[status]}</h3>            
        </div>`
    );
}

export default class TaskColumnComponent extends AbstractComponent {
    #status = null;

    constructor({status: status}) {
        super();
        this.#status = status;

        loadStylesheet('css/view/task-column.css');
        loadStylesheet(`css/property/${this.#status}.css`);
    }

    get template() {
        return createTaskColumnComponentTemplate(this.#status);
    }
}
