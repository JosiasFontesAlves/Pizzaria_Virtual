import { render, selek } from "./lib7.js";

/**
 * @param {[object | string]} component 
 * @returns {HTMLElement}
 */
const Component = (component, content) => render(component, content);

/**
 * @param {string} className 
 * @param {Array<string | HTMLElement>} content 
 * @returns {HTMLDivElement}
 */
export const Card = (className, content) => {
    const card = render({ div: { class: `card flex ${className}` } });
    card.append(...content);

    return card;
}

/**
 * @param {string} id 
 * @param {string} className 
 * @param {string} content 
 * @returns {HTMLButtonElement}
 */
export const Button = (id, className, content) => Component({ button: {id: id, class: className } }, content);

export const CardLink = (txt, link) => {
    selek('card-link').append(
        render('span', txt),
        render({ a: { href: link } }, 'aqui!')
    );
}

/**
 * @param {string} id 
 * @param {string} className 
 * @param {string} content 
 * @returns {HTMLSpanElement}
 */
export const Span = (id, className, content) => Component({ span: { id: id, class: className } }, content);