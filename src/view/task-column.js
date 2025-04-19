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

    constructor({status: status, onDrop: onDrop}) {
        super();
        this.#status = status;
        this.#setDropHandler(onDrop)

        this.loadStylesheet('css/view/task-column.css');
        this.loadStylesheet(`css/property/${this.#status}.css`);
    }

    get template() {
        return createTaskColumnComponentTemplate(this.#status);
    }

    #setDropHandler(onDrop) {
        this.element.addEventListener(
            'dragover',
            (e) => {
                e.preventDefault();
            }
        );

        this.element.addEventListener(
            'drop',
            (e) => {
                e.preventDefault();

                let targetTask = document.elementFromPoint(e.clientX, e.clientY);
                if (
                    targetTask === null
                    || (
                        !targetTask.classList.contains('outer')
                        && !targetTask.classList.contains('inner')
                    )
                )
                {
                    targetTask = null;
                    const tasks = this.element.querySelectorAll('.outer');
                    let closestDistance = Infinity;

                    tasks.forEach((task) => {
                        const rect = task.getBoundingClientRect();
                        const midpointY = rect.top + rect.height / 2;
                        const distance = Math.abs(e.clientY - midpointY);
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            targetTask = task;
                        }
                    });
                }

                const newTaskId = e.dataTransfer.getData('text/plain');

                if (!targetTask) {
                    onDrop(newTaskId, this.#status, null);
                    return;
                }

                targetTask = targetTask.closest('.outer')
                const rect = targetTask.getBoundingClientRect();
                const midpointY = rect.top + rect.height / 2;

                onDrop(newTaskId, this.#status, targetTask.id, e.clientY < midpointY);
            }
        )
    }
}
