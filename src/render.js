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
    const elements = component.getElement();
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        container.insertAdjacentElement(place, element);
    }
}

export {RenderPosition, createElement, render, loadStylesheet};
