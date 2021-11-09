import { Card, render, selek } from "../lib7.js";
import template from "../template.js";
import getPizzas from "../getPizzas.js";
import Btn from "../components/Btn.js";
import Span from "../components/Span.js";

export default () => {
    location.hash = '#pedido';

    const { card_btn, card_pizzas: [card, classe] } = template;

    let ctrl = 0;

    getPizzas(([, pizzas]) => {
        pizzas.map(pizza => {
            selek('container-pizzas').appendChild(
                Card(card, [
                    render({ p: { ...classe, id: `pizza_${ctrl}` } }, pizza),
                    Card(card_btn, [
                        Btn(`btn-menos-${ctrl}`, 'btn_menos', '-'),
                        Span(`span-pizza-${ctrl}`, '0'),
                        Btn(`btn-mais-${ctrl++}`, 'btn_mais', '+')
                    ])
                ])
            );
        });
    });
}