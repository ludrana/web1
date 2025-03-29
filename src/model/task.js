import {tasks} from "../mock/tasks.js";

export default class TaskModel {
    #boardTasks = tasks;

    getTasks() {
        return this.#boardTasks;
    }
}