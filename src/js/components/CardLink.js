import { getEntries, Link, render, Span } from '../lib7.js';

export default (/** @type {string} */ txt, /** @type {{ [href: string]: string; }} */ link) => {
    const [href, textContent] = getEntries(link)[0];

    return render({
        div: {
            class: 'padd15',
            id: 'card-link'
        }
    }, [Span(txt), Link(href, textContent, { class: 'link' })]);
};