import { Card, Link } from "../components.js";
import { consumirAPI, render, selek } from "../lib7.js";
import calcularValorTotal from "../valorTotal.js";

export default () => {
    const root = selek('root'),
        res = [];

    root.innerHTML = '';

    consumirAPI('/carrinho', carrinho => {
        Object.entries(carrinho).map(([pizza, qtde], i) => {
            if (qtde != 0) {
                res.push(
                    render(
                        { p: { class: 'carrinho_pizzas', id: `item_${i}` } },
                        `${pizza} - ${qtde} unidade${qtde > 1 ? 's' : ''}`
                    )
                );
            }
        });

        root.appendChild(
            Card('carrinho', [
                render('h1', 'Você escolheu:'),
                ...res,
                render({ section: { class: 'carrinho_pizzas flex', id: 'valorTotal' } })
            ])
        );

        calcularValorTotal();
    });

    selek('card-link').append(
        render('h3', 'O pedido está correto?'),
        Link('#confirmarPedido', 'Tudo ok!, Podemos continuar'),
        Link('#pedido', 'Não, quero mudar o pedido')
    );
}