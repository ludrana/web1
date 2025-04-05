import {loadStylesheet} from '../render.js';
import {AbstractComponent} from "./abstract-component.js";

function createClearButtonComponentTemplate() {
    return (
        `<button class="btn clear">× Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent {
    constructor() {
        loadStylesheet('css/view/clear-button.css');
        super();
    }

    get template() {
        return createClearButtonComponentTemplate();
    }
}
