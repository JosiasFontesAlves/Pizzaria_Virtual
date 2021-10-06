import { Card } from "../components.js";
import { render, selek } from "../lib7.js";

export default () => {
    const root = selek('root'),
        getCarrinho = JSON.parse(localStorage.getItem('carrinho')),
        res = [];

    selek('card-link').hidden = true;

    root.innerHTML = '';

    for (let pizza in getCarrinho) {
        res.push(
            render({ p: { class: 'carrinho_pizzas' } }, `${pizza} - ${getCarrinho[pizza]} unidade${getCarrinho[pizza] > 1 ? 's' : ''}`)
        );
    }

    //TODO -> Adicionar o valor das pizzas e calcular o preço final

    root.appendChild(
        Card('carrinho', [
            render('h1', 'Você escolheu:'),
            ...res,
            render('h3', 'O pedido está correto?'),
            render({ a: { href: '#pedido' } }, 'Não, quero mudar o pedido')
        ])
    );
}