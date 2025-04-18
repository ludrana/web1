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
        super();
        this.loadStylesheet('css/view/header.css');
    }

    get template() {
        return createHeaderComponentTemplate();
    }
}
