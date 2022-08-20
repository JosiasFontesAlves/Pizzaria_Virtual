import { LinkBar, render, Title } from '../lib7.js';

export default render({
    section: {
        className: 'w50',
        id: 'container-carrinho'
    }
}, [
    render({ section: { className: 'w50', id: 'carrinho' } }),
    Title(3, 'O pedido está correto?', { className: 'padd15 txt_center' }),
    LinkBar({
        '#finalizar': 'Sim, podemos continuar',
        '#pedido': 'Não, quero mudar o pedido'
    }, { className: 'flex' }, { className: ' padd7' })
]);