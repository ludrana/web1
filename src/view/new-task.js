import {loadStylesheet} from '../render.js';
import {AbstractComponent} from "./abstract-component.js";

function createNewTaskComponentTemplate() {
    return (
        `<label for="new-task-input">
            Новая задача
            <input id="new-task-input" type="text" placeholder="Название задачи...">
        </label>
        <button class="btn">+ Добавить</button>`
    );
}

export default class NewTaskComponent extends AbstractComponent {
    constructor() {
        loadStylesheet('css/view/new-task.css');
        super();
    }

    get template() {
        return createNewTaskComponentTemplate();
    }
}
