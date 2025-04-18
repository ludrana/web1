import {AbstractComponent} from "./abstract-component.js";

function createTaskItemComponentTemplate(task) {
    const {name} = task;
    return (
        `<div class="outer">
            <div class="inner">${name}</div>
        </div>`
    );
}

export default class TaskItemComponent extends AbstractComponent {
    #task;

    constructor({task}) {
        super();
        this.#task = task;
        this.loadStylesheet('css/view/task-item.css');
    }

    get template() {
        return createTaskItemComponentTemplate(this.#task);
    }
}
