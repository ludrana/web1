import {tasks} from "../mock/tasks.js";
import {Status} from "../enum/status.js";
import generateID from "../utils.js";

export default class TaskModel {
    #boardTasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks.filter(item => item.status === status);
    }

    addTask(title) {
        const newTask = {
            name: title,
            status: Status.BACKLOG,
            id: generateID()
        }

        this.#boardTasks.push(newTask);
        this.#notifyObservers();
    }

    clearTrash() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== Status.TRASH);
        this.#notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((o) => o !== observer);
    }

    #notifyObservers() {
        this.#observers.forEach((o) => o());
    }
}