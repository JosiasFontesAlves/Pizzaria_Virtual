import { render } from "./lib7.js";

export const Card = (className, content) => {
    const card = render({ div: { class: `card flex ${className}` } });
    card.append(...content);

    return card;
}

export const Button = (id, className, content) => {

    const button = render({ button: {id: id, class: className } }, content);

    return button;
}