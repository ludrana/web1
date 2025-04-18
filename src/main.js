import HeaderComponent from './view/header.js';
import NewTaskComponent from "./view/new-task.js";
import ClearButtonComponent from "./view/clear-button.js";

import TaskBoardPresenter from "./presenter/task-board-presenter.js";
import TaskModel from "./model/task.js";
import {render, RenderPosition} from './render.js';

const bodyContainer = document.querySelector('.board-app');
const newTaskContainer = document.querySelector('.new-task');
const taskListContainer = document.querySelector('.task-section');
const taskModel = new TaskModel();
const clearButton = new ClearButtonComponent({onClick: handleClearButtonClick})

const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskListContainer,
    taskModel: taskModel,
    clearButton: clearButton
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

function handleClearButtonClick() {
    taskBoardPresenter.clearTrash();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(
    new NewTaskComponent({
        onClick: handleNewTaskButtonClick
    }),
    newTaskContainer
);

taskBoardPresenter.init();
