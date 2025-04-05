import {loadStylesheet} from '../render.js';
import {AbstractComponent} from "./abstract-component.js";

function createTaskBoardComponentTemplate() {
    return (
        `<div class="task-list"></div>`
    );
}

export default class TaskBoardComponent extends AbstractComponent {
    constructor() {
        loadStylesheet('css/view/task-board.css');
        super();
    }

    get template() {
        return createTaskBoardComponentTemplate();
    }
}
