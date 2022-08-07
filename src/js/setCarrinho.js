import { insertChilds, mapEntries, render, Span } from './lib7.js';
import Item from './components/Item.js';

const valorTotal = [];

export default hash => {
    if (hash === '#carrinho') {
        const Pizzas = mapEntries(JSON.parse(localStorage.getItem('pizzaria')), ([pizza, qtde]) => {
            const [sabor, valor] = pizza.split('R$');

            valorTotal.push(Number(valor * qtde));

            return qtde > 0 ? Item(qtde, sabor, valor) : '';
        });

        insertChilds(hash, [
            ...Pizzas,
            render({
                div: {
                    className: 'flex item padd5'
                }
            }, [
                render({ b: { className: 'item_sabor' } }, 'Valor total: '),
                Span(`R$${valorTotal.reduce((a, b) => a + b)}`, { className: 'item_valor' })
            ])
        ]);
    }
};