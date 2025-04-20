import HeaderComponent from './view/header.js';
import NewTaskComponent from "./view/new-task.js";
import ClearButtonComponent from "./view/clear-button.js";
import LoadingComponent from "./view/loading.js";
import TaskBoardPresenter from "./presenter/task-board-presenter.js";
import TaskModel from "./model/task.js";
import TasksApiService from "./api/tasks/tasks-api-service.js";
import {render, RenderPosition} from './render.js';

const ENDPOINT = "https://6804390d79cb28fb3f5a9631.mockapi.io"

const bodyContainer = document.querySelector('.board-app');
const newTaskContainer = document.querySelector('.new-task');
const taskListContainer = document.querySelector('.task-section');
const taskModel = new TaskModel({apiService: new TasksApiService(ENDPOINT)});
const clearButton = new ClearButtonComponent({onClick: handleClearButtonClick})

const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskListContainer,
    taskModel: taskModel,
    clearButton: clearButton,
    loading: new LoadingComponent(),
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