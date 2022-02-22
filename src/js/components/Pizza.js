import { render } from '../lib7.js';
import CardBtn from './CardBtn.js';

const Pizza = sabor => render({
    p: {
        class: 'sabor',
    },
}, sabor);

/**
 * @param {string} sabor
 */
export default sabor => render({
    div: { class: 'flex pizza' },
}, [
    Pizza(sabor), CardBtn(sabor)
]);
