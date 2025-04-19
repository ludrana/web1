import TaskBoardComponent from '../view/task-board.js';
import TaskColumnComponent from '../view/task-column.js';
import TaskItemComponent from "../view/task-item.js";
import {render} from '../render.js';
import {Status} from "../enum/status.js";
import PlaceholderComponent from "../view/placeholder.js";

export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #taskModel = null;
    #clearButton = null;

    constructor({boardContainer, taskModel, clearButton: clearButton}) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
        this.#clearButton = clearButton;

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

    clearTrash() {
        this.#taskModel.clearTrash();
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
        const tasksForStatus = this.#taskModel.getTasksByStatus(status);
        const taskColumnComponent = new TaskColumnComponent({
            status: status,
            onDrop: this.#handleTaskDrop.bind(this),
        });

        render(taskColumnComponent, this.#taskBoardComponent.element);
        if (tasksForStatus.length === 0) {
            this.#renderPlaceholder(taskColumnComponent);
        } else {
            tasksForStatus.forEach((task) => this.#renderTask(task, taskColumnComponent));
        }

        return taskColumnComponent;
    }

    #renderTrashColumn() {
        const container = this.#renderTaskColumn(Status.TRASH);
        render(this.#clearButton, container.element);

        this.#clearButton.element.disabled = this.#taskModel.getTasksByStatus(Status.TRASH).length === 0;
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

    #handleTaskDrop(newTaskId, status, targetTaskId, isTop) {
        this.#taskModel.updateTask(newTaskId, status, targetTaskId, isTop);
    }
}