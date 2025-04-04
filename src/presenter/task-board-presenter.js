import TaskBoardComponent from '../view/task-board.js';
import TaskColumnComponent from '../view/task-column.js';
import TaskItemComponent from "../view/task-item.js";
import {render} from '../render.js';
import {Status} from "../enum/status.js";
import ClearButtonComponent from "../view/clear-button.js";

export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent()
    #boardContainer = null;
    #taskModel = null;
    #boardTasks = [];

    constructor({boardContainer, taskModel}) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    init() {
        this.#boardTasks = [...this.#taskModel.getTasks()];

        render(this.#taskBoardComponent, this.#boardContainer);
        for (let status in Status) {
            const taskColumnComponent = new TaskColumnComponent({status});
            render(taskColumnComponent, this.#taskBoardComponent.getElement()[0]);
            for (let task of this.#boardTasks.filter(item => item.status === Status[status])) {
                const taskItemComponent = new TaskItemComponent({task});
                render(taskItemComponent, taskColumnComponent.getElement()[0]);
            }

            if (Status[status] === Status.TRASH) {
                render(new ClearButtonComponent(), taskColumnComponent.getElement()[0])
            }
        }
    }
}