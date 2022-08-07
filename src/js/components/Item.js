import { render, Span } from '../lib7.js';

export default (qtde, sabor, valor) =>
    render({
        div: {
            className: 'flex item padd5 subl_nardo w50'
        }
    }, [
        Span(`${qtde} pizza${qtde > 1 ? 's' : ''} de ${sabor}`, { className: 'item_sabor' }),
        Span(`R$${valor * qtde}`, { className: 'item_valor' }),
    ]);