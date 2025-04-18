import HeaderComponent from './view/header.js';
import NewTaskComponent from "./view/new-task.js";
import TaskBoardPresenter from "./presenter/task-board-presenter.js";

import {render, RenderPosition} from './render.js';
import TaskModel from "./model/task.js";

const bodyContainer = document.querySelector('.board-app');
const newTaskContainer = document.querySelector('.new-task');
const taskListContainer = document.querySelector('.task-section');
const taskModel = new TaskModel();

const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskListContainer,
    taskModel: taskModel,
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(
    new NewTaskComponent({
        onClick: handleNewTaskButtonClick
    }),
    newTaskContainer
);

taskBoardPresenter.init();
