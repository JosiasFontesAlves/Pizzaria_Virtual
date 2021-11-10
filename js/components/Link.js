import { render } from "../lib7.js";

export default (url, content) => render({
    a: {
        class: 'links',
        href: url
    }
}, content);