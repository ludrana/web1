import {createElement, loadStylesheet} from '../render.js';

function createHeaderComponentTemplate() {
    return (
        `<header>
            <h2>Список задач</h2>
        </header>`
    );
}

export default class HeaderComponent {
    constructor() {
        loadStylesheet('css/view/header.css');
    }

    getTemplate() {
        return createHeaderComponentTemplate();
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
