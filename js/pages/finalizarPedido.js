import { Card, Link } from "../components.js";
import { render, selek } from "../lib7.js";
import calcularValorTotal from "../valorTotal.js";

export default () => {
    const root = selek('root'),
        getCarrinho = JSON.parse(localStorage.getItem('carrinho')),
        res = [];

    root.innerHTML = '';

    let ctrl = 0;

    for (let pizza in getCarrinho) {
        if (getCarrinho[pizza] != 0) {
            res.push(
                render(
                    { p: { class: 'carrinho_pizzas', id: `item_${ctrl++}` } },
                    `${pizza} - ${getCarrinho[pizza]} unidade${getCarrinho[pizza] > 1 ? 's' : ''}`
                )
            );
        }
    }

    root.appendChild(
        Card('carrinho', [
            render('h1', 'Você escolheu:'),
            ...res,
            render({ section: { class: 'carrinho_pizzas flex', id: 'valorTotal' } })

        ])
    );

    calcularValorTotal();

    selek('card-link').append(
        render('h3', 'O pedido está correto?'),
        Link('#confirmarPedido', 'Tudo ok!, Podemos continuar'),
        Link('#pedido', 'Não, quero mudar o pedido')
    );
}