import HeaderComponent from './view/header.js';
import NewTaskComponent from "./view/new-task.js";
import TaskBoardComponent from "./view/task-board.js";
import TaskColumnComponent from "./view/task-column.js";
import TaskItemComponent from "./view/task-item.js";
import {columnsConfig} from "./c.js";

import {render, RenderPosition} from './render.js';

const bodyContainer = document.querySelector('.board-app');
const newTaskContainer = document.querySelector('.new-task');
const taskListContainer = document.querySelector('.task-section')

const taskBoard = new TaskBoardComponent();

const columns = {};
columnsConfig.forEach(({ title, cssClass, id }) => {
    columns[id] = new TaskColumnComponent(title, cssClass);
    render(columns[id], taskBoard.getElement()[0]);
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new NewTaskComponent(), newTaskContainer);
render(taskBoard, taskListContainer);

for (let columnId in columns) {
    for (let i = 0; i < 4; i++) {
        render(new TaskItemComponent('Название первой задачи'), columns[columnId].getElement()[0]);
    }
}
