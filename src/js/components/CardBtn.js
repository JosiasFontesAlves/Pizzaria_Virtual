import { render, Span } from '../lib7.js';

/**
 * @param {string} classe 
 * @param {string} txt
 */
const Btn = (classe, txt) => render({ button: { class: `btn_${classe} fn` } }, txt);

export default sabor => render({
    section: {
        class: 'card_btn'
    }
}, [Btn('menos', '-'), Span('0', { id: `span_${sabor}` }), Btn('mais', '+')]);