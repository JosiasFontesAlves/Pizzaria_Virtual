import { render, Span } from "../lib7.js";

export default render({
    footer: {
        class: 'center fix flex w100'
    }
}, Span('Matsa \u00A9 2022', { id: 'copyright' }));