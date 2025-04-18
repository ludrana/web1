import {AbstractComponent} from "./abstract-component.js";

function createClearButtonComponentTemplate() {
    return (
        `<button class="btn clear">× Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent {
    constructor() {
        super();
        this.loadStylesheet('css/view/clear-button.css');
    }

    get template() {
        return createClearButtonComponentTemplate();
    }
}
