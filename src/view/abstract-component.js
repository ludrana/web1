import {createElement} from "../render.js";

export class AbstractComponent {
    #element = null;

    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
        }
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template);
        }

        return this.#element;
    }

    get template() {
        throw new Error('Abstract method not implemented: get template');
    }

    removeElement() {
        this.#element = null;
    }

    loadStylesheet(url) {
        if (!window.loadedStylesheets) {
            window.loadedStylesheets = new Set();
        }

        if (!window.loadedStylesheets.has(url)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);

            window.loadedStylesheets.add(url);
        }
    }
}