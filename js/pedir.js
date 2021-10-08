import pizzas from "./pizzas.js";
import { render, selek } from "./lib7.js";
import { Button, Card, CardLink, Span } from "./components.js";
import carrinho from "./carrinho.js";

export default () => {
    const root = selek('root'),
        { value: nome } = selek('txt'),
        cardLink = selek('card-link');

    cardLink.hidden = false;

    root.style.marginTop = '50px';
    root.innerHTML = '';
    root.appendChild(
        render({ h2: { class: 'fix w100', id: 'nome' } }, `Olá ${nome}! Qual é o seu pedido?`)
    );

    let ctrl = 0;

    for (let [preço, sabor] of Object.entries(pizzas)) {
        const preços = {
            Tradicionais: 25,
            Doces: 25,
            Especiais: 35
        }

        sabor.forEach(pizza => {
            root.append(
                Card('container', [
                    Card('pizzas_valor', [
                        render({ p: { id: `pizza_${ctrl++}`, class: 'pizza' } }, pizza),
                        Span(`valor_${ctrl}`, 'span_pizzas', `R$${preços[preço]}`),
                    ]),
                    Card('btn', [
                        Button(`btn_menos_${ctrl}`, 'menos', '-'),
                        Span(`num_${ctrl}`, 'span_pizzas', '0'),
                        Button(`btn_mais_${ctrl}`, 'mais', '+')
                    ])
                ])
            );
        });
    }

    carrinho();

    const { innerText } = selek('valor_1'),
    getIndex = (from, to) => [from, to].map(i => innerText.indexOf(i));

    CardLink('Para finalizar o pedido Clique ', '#finalizarPedido');
}