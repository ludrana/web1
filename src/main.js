import HeaderComponent from './view/header.js';
import NewTaskComponent from "./view/new-task.js";
import TaskBoardComponent from "./view/task-board.js";
import TaskColumnComponent from "./view/task-column.js";
import TaskItemComponent from "./view/task-item.js";

import {render, RenderPosition} from './render.js';

const bodyContainer = document.querySelector('.board-app');
const newTaskContainer = document.querySelector('.new-task');
const taskListContainer = document.querySelector('.task-section')

const taskBoard = new TaskBoardComponent();
const backlog = new TaskColumnComponent('Бэклог', 'backlog');
const inProgress = new TaskColumnComponent('В процессе', 'in-progress');
const done = new TaskColumnComponent('Готово', 'done');
const trash = new TaskColumnComponent('Корзина', 'trash');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new NewTaskComponent(), newTaskContainer);
render(taskBoard, taskListContainer);

render(backlog, taskBoard.getElement()[0]);
render(inProgress, taskBoard.getElement()[0]);
render(done, taskBoard.getElement()[0]);
render(trash, taskBoard.getElement()[0]);

render(new TaskItemComponent('Название первой задачи'), backlog.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), backlog.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), backlog.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), backlog.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), inProgress.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), inProgress.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), inProgress.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), inProgress.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), done.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), done.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), done.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), done.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), trash.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), trash.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), trash.getElement()[0]);
render(new TaskItemComponent('Название первой задачи'), trash.getElement()[0]);