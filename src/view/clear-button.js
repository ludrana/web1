import {createElement, loadStylesheet} from '../render.js';

function createClearButtonComponentTemplate() {
    return (
        `<button class="btn clear">× Очистить</button>`
    );
}

export default class ClearButtonComponent {
    constructor() {
        loadStylesheet('css/view/clear-button.css');
    }

    getTemplate() {
        return createClearButtonComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
