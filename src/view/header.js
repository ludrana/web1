import {loadStylesheet} from '../render.js';
import {AbstractComponent} from "./abstract-component.js";

function createHeaderComponentTemplate() {
    return (
        `<header>
            <h2>Список задач</h2>
        </header>`
    );
}

export default class HeaderComponent extends AbstractComponent {
    constructor() {
        loadStylesheet('css/view/header.css');
        super();
    }

    get template() {
        return createHeaderComponentTemplate();
    }
}
