import { AJAX, insertChilds, mapEntries, render, selek, Span } from './lib7.js';
import Item from './components/Item.js';

export default async hash => {
    if (hash !== '#carrinho') return;

    const valorTotal = [];
    
    const Pizzas = mapEntries(
        await AJAX.get('carrinho.json'),
        ([pizza, qtde]) => {
            const [sabor, valor] = pizza.split(' R$');

            valorTotal.push(Number(valor * qtde));

            return qtde > 0 ? Item(qtde, sabor, valor) : '';
        }
    ).filter(item => item !== '');

    selek(hash).innerHTML = '';

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