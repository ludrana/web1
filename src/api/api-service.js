import {Method} from "../enum/http.js";

export default class ApiService {
    #endPoint;

    constructor(endPoint) {
        this.#endPoint = endPoint;
    }

    async _load({
                    url,
                    method = Method.GET,
                    body = null,
                    headers = new Headers(),
                }) {
        const response = await fetch(
            `${this.#endPoint}/${url}`,
            {method, body, headers},
        );
        try {
            ApiService.checkStatus(response);
            return response;
        } catch (err) {
            ApiService.catchError(err);
        }
    }

    static parseResponse(response) {
        return response.json();
    }

    static checkStatus(response) {
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    static catchError(err) {
        throw err;
    }
}
