import TaskBoardComponent from '../view/task-board.js';
import TaskColumnComponent from '../view/task-column.js';
import TaskItemComponent from "../view/task-item.js";
import {render} from '../render.js';
import {Status} from "../enum/status.js";
import ClearButtonComponent from "../view/clear-button.js";
import PlaceholderComponent from "../view/placeholder.js";

export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #taskModel = null;
    #boardTasks = [];

    constructor({boardContainer, taskModel}) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    init() {
        this.#boardTasks = [...this.#taskModel.tasks];
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#taskBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            if (status === Status.TRASH) {
                this.#renderTrashColumn();
            } else {
                this.#renderTaskColumn(status);
            }
        });
    }

    #renderTaskColumn(status) {
        const taskColumnComponent = new TaskColumnComponent({status});
        render(taskColumnComponent, this.#taskBoardComponent.element[0]);

        const tasksForStatus = this.#getTasksByStatus(this.#boardTasks, status);
        if (tasksForStatus.length === 0) {
            this.#renderPlaceholder(taskColumnComponent);
        } else {
            tasksForStatus.forEach((task) => this.#renderTask(task, taskColumnComponent));
        }

        return taskColumnComponent;
    }

    #renderTrashColumn() {
        const container = this.#renderTaskColumn(Status.TRASH);
        render(new ClearButtonComponent(), container.element[0]);
    }

    #getTasksByStatus(boardTasks, status) {
        return boardTasks.filter(item => item.status === status);
    }

    #renderTask(task, container) {
        const taskItemComponent = new TaskItemComponent({task});
        render(taskItemComponent, container.element[0]);
    }

    #renderPlaceholder(container) {
        render(new PlaceholderComponent(), container.element[0]);
    }
}