export const createHtmlElement = (htmlString: string): any => {
    const dom = document.createElement("div");
    dom.innerHTML = htmlString;
    const elem = dom.children[0];
    return elem;
};

export const AddToDom = (target: Node, node: HTMLElement) => {
    return target.appendChild(node);
};

export const RemoveFromDom = (target: any, node: Element) => {
    return target.removeChild(node);
};
