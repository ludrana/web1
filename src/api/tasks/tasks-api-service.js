import ApiService from "../api-service.js";
import {Method} from "../../enum/http.js";

export default class TasksApiService extends ApiService {
    get tasks() {
        return this._load({url: 'tasks'})
            .then(ApiService.parseResponse);
    }

    async addTask(task) {
        const response = await this._load({
            url: 'tasks',
            method: Method.POST,
            body: JSON.stringify(task),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return ApiService.parseResponse(response);
    }

    async updateTask(task) {
        const response = await this._load({
            url: `tasks/${task.id}`,
            method: Method.PUT,
            body: JSON.stringify(task),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return await ApiService.parseResponse(response);
    }

    async deleteTask(id) {
        await this._load({
            url: `tasks/${id}`,
            method: Method.DELETE,
        });
    }
}
