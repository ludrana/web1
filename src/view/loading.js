import {AbstractComponent} from "./abstract-component.js";

function createTemplate() {
    return (
        `<p class="loading">Загрузка...</p>`
    );
}

export default class LoadingComponent extends AbstractComponent {
    constructor() {
        super();
        this.loadStylesheet('css/view/loading.css');
    }

    get template() {
        return createTemplate();
    }
}