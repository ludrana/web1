import {AbstractComponent} from "./abstract-component.js";

function createTaskItemComponentTemplate(task) {
    const {id, name} = task;
    return (
        `<div class="outer" id="${id}">
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
        this.#afterCreate();
    }

    get template() {
        return createTaskItemComponentTemplate(this.#task);
    }

    #afterCreate() {
        this.#makeDraggable()
    }

    #makeDraggable() {
        this.element.setAttribute('draggable', true);

        this.element.addEventListener(
            'dragstart',
            (e) => {
                e.dataTransfer.setData('text/plain', this.#task.id);
            }
        );
    }
}
