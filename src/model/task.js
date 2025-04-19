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
        return this.#boardTasks
            .filter(item => item.status === status)
            .sort((a, b) => a.ord - b.ord);
    }

    updateTask(newTaskId, status, targetTaskId, isTop = false) {
        const newTask = this.#boardTasks.find(task => task.id === newTaskId);

        if (newTask === undefined) {
            return;
        }

        let ord;
        if (targetTaskId === null) {
            ord = this.#getMaxOrd(status) + 1;
        } else {
            const targetTask = this.#boardTasks.find(task => task.id === targetTaskId);
            ord = isTop ? targetTask.ord : targetTask.ord + 1;
        }

        newTask.status = status;
        newTask.ord = ord
        this.#recalculateOrd(newTask, status);

        this.#notifyObservers();
    }

    addTask(title) {
        const newTask = {
            name: title,
            status: Status.BACKLOG,
            id: generateID(),
            ord: this.#getMaxOrd(Status.BACKLOG) + 1
        }

        this.#boardTasks.push(newTask);
        this.#notifyObservers();
    }

    clearTrash() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== Status.TRASH);
        this.#notifyObservers();
    }

    #recalculateOrd(task, status) {
        const tasksByStatus = this.getTasksByStatus(status)
        tasksByStatus.forEach((el) => {
            if (el.ord >= task.ord && el.id !== task.id) {
                el.ord++;
            }
        })
    }

    #getMaxOrd(status) {
        const tasks = this.getTasksByStatus(status);

        if (tasks.length === 0) {
            return 0;
        }

        return Math.max(...tasks.map(item => item.ord));
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