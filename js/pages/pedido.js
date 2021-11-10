import { Card, insertChilds, render, selek } from "../lib7.js";
import template from "../template.js";
import getPizzas from "../getPizzas.js";
import Btn from "../components/Btn.js";
import Span from "../components/Span.js";
import carrinho from "../carrinho.js";

export default () => {
    location.hash = '#pedido';

    const { card_btn, card_pizzas: [card, classe], valor } = template;

    let ctrl = 0;

    getPizzas(([sabor, pizzas]) => {
        pizzas.map(pizza => {
            selek('container-pizzas').appendChild(
                Card(card, [
                    render({ p: { ...classe, id: `pizza_${ctrl}` } }, `${pizza} R$${valor[sabor]}`),
                    Card(card_btn, [
                        Btn(`btn-menos-${ctrl}`, 'btn_menos', '-'),
                        Span(`span-pizza-${ctrl}`, '0'),
                        Btn(`btn-mais-${ctrl++}`, 'btn_mais', '+')
                    ])
                ])
            );
        });
    });
    
    carrinho();

    insertChilds('#card-link', [
        Span('link', 'Para finalizar o pedido clique '),
        render({ a: { href: '#finalizarPedido' } }, 'aqui!')
    ]);
}