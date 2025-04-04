import {AbstractComponent} from "./view/abstract-component.js";

const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
};

function createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;

    return Array.from(newElement.children);
}

function loadStylesheet(url) {
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

function render(component, container, place = RenderPosition.BEFOREEND) {
    if (!(component instanceof AbstractComponent)) {
        throw new Error('Can render only components');
    }

    if (container === null) {
        throw new Error('Container element doesn\'t exist');
    }

    const elements = component.element;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        container.insertAdjacentElement(place, element);
    }
}

export {RenderPosition, createElement, render, loadStylesheet};
