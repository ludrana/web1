import TaskBoardComponent from '../view/task-board.js';
import TaskColumnComponent from '../view/task-column.js';
import TaskItemComponent from "../view/task-item.js";
import {render} from '../render.js';
import {Status} from "../enum/status.js";
import PlaceholderComponent from "../view/placeholder.js";
import {UserAction} from "../enum/user-action.js";

export default class TaskBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #taskModel = null;
    #clearButton = null;
    #loading = null

    constructor(
        {
            boardContainer,
            taskModel,
            clearButton: clearButton,
            loading: loading,
        }
    ) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
        this.#clearButton = clearButton;
        this.#loading = loading;

        this.#taskModel.addObserver(this.#handleModelEvent.bind(this))
    }

    async init() {
        render(this.#loading, this.#boardContainer);
        await this.#taskModel.init();
    }

    async createTask() {
        const input = document.getElementById('new-task-input');
        const name = input.value.trim();

        if (name === '') {
            return;
        }

        try {
            await this.#taskModel.addTask(name);
            input.value = '';
        } catch (e) {
            console.error('Ошибка при создании задачи:', e)
        }
    }

    async clearTrash() {
        await this.#taskModel.clearTrash();
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
        console.log('we good?')
        this.#boardContainer.innerHTML = '';
    }

    #handleModelEvent(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
            default:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    async #handleTaskDrop(newTaskId, status, targetTaskId, isTop) {
        await this.#taskModel.updateTask(newTaskId, status, targetTaskId, isTop);
    }
}