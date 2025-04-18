import {AbstractComponent} from "./abstract-component.js";

function createClearButtonComponentTemplate() {
    return (
        `<button class="btn clear" type="submit">× Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleCLick = null;

    constructor({onClick}) {
        super();
        this.#handleCLick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
        this.loadStylesheet('css/view/clear-button.css');
    }

    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (e) => {
        e.preventDefault();
        this.#handleCLick();
    };
}
