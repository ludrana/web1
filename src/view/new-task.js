import {AbstractComponent} from "./abstract-component.js";

function createNewTaskComponentTemplate() {
    return (
        `<form>
            <label for="new-task-input">
                Новая задача
                <input id="new-task-input" type="text" placeholder="Название задачи...">
            </label>
            <button class="btn" type="submit">+ Добавить</button>
        </form>`
    );
}

export default class NewTaskComponent extends AbstractComponent {
    #handleCLick = null;

    constructor({onClick}) {
        super();
        this.#handleCLick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
        this.loadStylesheet('css/view/new-task.css');
    }

    get template() {
        return createNewTaskComponentTemplate();
    }

    #clickHandler = (e) => {
        e.preventDefault();
        this.#handleCLick();
    };
}
