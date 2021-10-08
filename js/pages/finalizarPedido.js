import { Card } from "../components.js";
import { render, selek } from "../lib7.js";
//import pizzas from "../pizzas.js";

export default () => {
    const root = selek('root'),
        getCarrinho = JSON.parse(localStorage.getItem('carrinho')),
        res = [];

    selek('card-link').hidden = true;

    root.innerHTML = '';

    let ctrl = 0;

    for (let pizza in getCarrinho) {

        if (getCarrinho[pizza] != 0) {
            res.push(
                render(
                    { p: { class: 'carrinho_pizzas', id: `item_${ctrl++}` } },
                    `${pizza} * ${getCarrinho[pizza]} unidade${getCarrinho[pizza] > 1 ? 's' : ''}`
                )
            );
        }
    }

    //TODO -> Calcular o preço final

    

    root.appendChild(
        Card('carrinho', [
            render('h1', 'Você escolheu:'),
            ...res,
            render('h3', 'O pedido está correto?'),
            render({ a: { href: '#pedido' } }, 'Não, quero mudar o pedido')
        ])
    );

    const {innerText } = selek('item_0');

    console.log(innerText.substring(innerText.indexOf('$'), innerText.indexOf('u')));
}