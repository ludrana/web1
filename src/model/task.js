import {Status} from "../enum/status.js";
import Observable from "../observable.js";
import {UpdateType, UserAction} from "../enum/user-action.js";

export default class TaskModel extends Observable{
    #boardTasks = [];
    #apiService = null;

    constructor({apiService}) {
        super();

        this.#apiService = apiService;
        this.init().then(() => this._notify(UpdateType.INIT));
    }

    async init() {
        try {
            this.#boardTasks = await this.#apiService.tasks;
        } catch (e) {
            this.#boardTasks = [];
        }
    }

    get tasks() {
        return this.#boardTasks;
    }

    getTasksByStatus(status) {
        return this.#boardTasks
            .filter(item => item.status === status)
            .sort((a, b) => a.ord - b.ord);
    }

    async addTask(name) {
        const newTask = {
            name,
            status: Status.BACKLOG,
            ord: this.#getMaxOrd(Status.BACKLOG)
        };
        try {
            const createdTask = await this.#apiService.addTask(newTask);
            this.#boardTasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    async updateTask(newTaskId, status, targetTaskId, isTop = false) {
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
        const changes = this.#recalculateOrd(newTask, status);

        try {
            await Promise.all(changes.map((el) => {
                const updated = this.#apiService.updateTask(el);
                Object.assign(el, updated);
            }));

            this._notify(UserAction.UPDATE_TASK, {status: status});
        } catch (e) {
            console.error('Ошибка при обновлении задачи:', e);
            throw e;
        }
    }

    async clearTrash() {
        const tasks = this.#boardTasks.filter(task => task.status === Status.TRASH);

        try {
            await Promise.all(tasks.map(el => this.#apiService.deleteTask(el.id)));
            this.#boardTasks = this.#boardTasks.filter(task => task.status !== Status.TRASH);

            this._notify(UserAction.DELETE_TASK, {status: Status.TRASH});
        } catch (e) {
            console.error('Ошибка при удалении задачи:', e);
            throw e;
        }
    }

    #recalculateOrd(task, status) {
        const tasksByStatus = this.getTasksByStatus(status)
        const changes = [task];

        tasksByStatus.forEach((el) => {
            if (el.ord >= task.ord && el.id !== task.id) {
                el.ord++;
                changes.push(el);
            }
        });
        return changes;
    }

    #getMaxOrd(status) {
        const tasks = this.getTasksByStatus(status);

        if (tasks.length === 0) {
            return 0;
        }

        return Math.max(...tasks.map(item => item.ord));
    }
}