import {tasks} from "../mock/tasks.js";

export default class TaskModel {
    #boardTasks = tasks;

    get tasks() {
        return this.#boardTasks;
    }
}