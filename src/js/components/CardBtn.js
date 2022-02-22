import { render } from '../lib7.js';

/**
 * @param {string} classe 
 * @param {string} txt
 */
const Btn = (classe, txt) => render({ button: { class: `btn_${classe} fn` } }, txt);
const Span = sabor => render({ span: { id: sabor } }, '0');

export default sabor => render({
    section: {
        class: 'card_btn'
    }
}, [
    Btn('menos', '-'), Span(`span_${sabor}`), Btn('mais', '+')
]);