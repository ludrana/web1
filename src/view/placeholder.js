import {AbstractComponent} from "./abstract-component.js";

function createPlaceholderComponentTemplate() {
    return (
        `<div class="placeholder">Перетащите карточку</div>`
    );
}

export default class PlaceholderComponent extends AbstractComponent {
    constructor() {
        super();
        this.loadStylesheet('css/view/placeholder.css');
    }

    get template() {
        return createPlaceholderComponentTemplate();
    }
}