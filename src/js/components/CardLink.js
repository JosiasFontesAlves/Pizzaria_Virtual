import { getEntries, Link, render, Span } from '../lib7.js';

export default (/** @type {{ [href: string]: string; }} */ link) => {
    const [href, textContent] = getEntries(link)[0];

    return render({
        div: {
            className: 'padd15 txt_center',
            id: 'card-link'
        }
    }, [
        Span(`${textContent} Clique `),
        Link(href, 'aqui', { class: 'link' })
    ]);
};