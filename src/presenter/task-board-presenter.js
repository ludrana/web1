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

    constructor({boardContainer, taskModel}) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;

        this.#taskModel.addObserver(this.#handleModelChange.bind(this))
    }

    init() {
        this.#renderBoard();
    }

    createTask() {
        const input = document.getElementById('new-task-input');
        const title = input.value.trim();

        if (title === '') {
            return;
        }

        this.#taskModel.addTask(title);
        input.value = '';
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
        render(taskColumnComponent, this.#taskBoardComponent.element);

        const tasksForStatus = this.#taskModel.getTasksByStatus(status);
        if (tasksForStatus.length === 0) {
            this.#renderPlaceholder(taskColumnComponent);
        } else {
            tasksForStatus.forEach((task) => this.#renderTask(task, taskColumnComponent));
        }

        return taskColumnComponent;
    }

    #renderTrashColumn() {
        const container = this.#renderTaskColumn(Status.TRASH);
        render(new ClearButtonComponent(), container.element);
    }

    #renderTask(task, container) {
        const taskItemComponent = new TaskItemComponent({task});
        render(taskItemComponent, container.element);
    }

    #renderPlaceholder(container) {
        render(new PlaceholderComponent(), container.element);
    }

    #clearBoard() {
        this.#taskBoardComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
}