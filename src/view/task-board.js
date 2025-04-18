import {AbstractComponent} from "./abstract-component.js";

function createTaskBoardComponentTemplate() {
    return (
        `<div class="task-list"></div>`
    );
}

export default class TaskBoardComponent extends AbstractComponent {
    constructor() {
        super();
        this.loadStylesheet('css/view/task-board.css');
    }

    get template() {
        return createTaskBoardComponentTemplate();
    }
}
