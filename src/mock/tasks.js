import {Status} from "../enum/status.js";

export const tasks = [
    {
        "id": 1,
        "name": "Выучить JS",
        "status": Status.BACKLOG
    },
    {
        "id": 2,
        "name": "Выучить React",
        "status": Status.BACKLOG
    },
    {
        "id": 3,
        "name": "Сделать домашку",
        "status": Status.BACKLOG
    },
    {
        "id": 4,
        "name": "Выпить смузи",
        "status": Status.IN_PROGRESS
    },
    {
        "id": 5,
        "name": "Попить воды",
        "status": Status.IN_PROGRESS
    },
    {
        "id": 6,
        "name": "Позвонить маме",
        "status": Status.DONE
    },
    {
        "id": 7,
        "name": "Погладить кота",
        "status": Status.DONE
    },
    {
        "id": 8,
        "name": "Сходить погулять",
        "status": Status.TRASH
    },
    {
        "id": 9,
        "name": "Прочитать Войну и Мир",
        "status": Status.TRASH
    },
];
