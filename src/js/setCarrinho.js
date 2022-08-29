import { insertChilds, mapEntries, render, Span } from './lib7.js';
import Item from './components/Item.js';

const valorTotal = [];

export default hash => {
    if (hash !== '#carrinho') return;

    const Pizzas = mapEntries(JSON.parse(sessionStorage.getItem('pizzaria')), ([pizza, qtde]) => {
        const [sabor, valor] = pizza.split('R$');

        valorTotal.push(Number(valor * qtde));

        return qtde > 0 ? Item(qtde, sabor, valor) : '';
    });

    insertChilds(hash, [
        ...Pizzas,
        render({
            div: {
                className: 'flex item padd5 w50'
            }
        }, [
            render({ b: { className: 'item_sabor' } }, 'Valor total: '),
            Span(`R$${valorTotal.reduce((a, b) => a + b, 0)}`, { className: 'item_valor' })
        ])
    ]);
};