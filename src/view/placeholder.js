import {loadStylesheet} from '../render.js';
import {AbstractComponent} from "./abstract-component.js";

function createPlaceholderComponentTemplate() {
    return (
        `<div class="placeholder">Перетащите карточку</div>`
    );
}

export default class PlaceholderComponent extends AbstractComponent {
    constructor() {
        loadStylesheet('css/view/placeholder.css');
        super();
    }

    get template() {
        return createPlaceholderComponentTemplate();
    }
}