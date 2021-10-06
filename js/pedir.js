import pizzas from "./pizzas.js";
import { render, selek, selekFn, seleKlass } from "./lib7.js";
import { Button, Card, CardLink } from "./components.js";

export default () => {
    const root = selek('root'),
        { value: nome } = selek('txt'),
        cardLink = selek('card-link'),
        carrinho = {},
        span = num => selek(`num_${num}`),
        setCarrinho = id => Number(span(id).innerHTML),
        salvarCarrinho = () => localStorage.setItem('carrinho', JSON.stringify(carrinho));

    cardLink.hidden = false;

    root.style.marginTop = '50px';
    root.innerHTML = '';
    root.appendChild(
        render({ h2: { class: 'fix w100', id: 'nome' } }, `Olá ${nome}! Qual é o seu pedido?`)
    );

    let ctrl = 0;

    for (let sabor of Object.values(pizzas)) {
        sabor.forEach(pizza => {
            root.append(
                Card('container', [
                    render({ p: { id: `pizza_${ctrl++}`, class: 'pizza' } }, pizza),
                    Card('btn', [
                        Button(`btn_menos_${ctrl}`, 'menos', '-'),
                        render({ span: { id: `num_${ctrl}`, class: 'span_pizzas' } }, '0'),
                        Button(`btn_mais_${ctrl}`, 'mais', '+')
                    ])
                ])
            );
        });
    }

    // Adiciona pizzas no carrinho
    [...seleKlass('mais')].forEach(({ id }) => {
        let indexPizza = id => id.length === 11 ? id[9] + id[10] : id[9];

        selekFn(id, 'click', () => {
            span(indexPizza(id)).innerHTML = setCarrinho(indexPizza(id)) + 1;

            carrinho[selek(`pizza_${indexPizza(id) - 1}`).innerHTML] = setCarrinho(indexPizza(id));
            salvarCarrinho();
        });
    });

    // Remove-as do carrinho
    [...seleKlass('menos')].forEach(({ id }) => {
        selekFn(id, 'click', () => {
            let indexPizza = id => id.length === 12 ? id[10] + id[11] : id[10];

            if (span(indexPizza(id)).innerHTML > 0) {
                span(indexPizza(id)).innerHTML = setCarrinho(indexPizza(id)) - 1;

                carrinho[selek(`pizza_${indexPizza(id) - 1}`).innerHTML] = setCarrinho(indexPizza(id));
                salvarCarrinho();
            };
        })
    });

    CardLink('Para finalizar o pedido Clique ', '#finalizarPedido');
}