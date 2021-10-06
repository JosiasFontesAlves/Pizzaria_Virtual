import { render, selek } from "./lib7.js";

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
export const Button = (id, className, content) => {

    const button = render({ button: {id: id, class: className } }, content);

    return button;
}

export const CardLink = (txt, link) => {
    selek('card-link').append(
        render('span', txt),
        render({ a: { href: link } }, 'aqui!')
    );
}