import pizzas from "./pizzas.js";
import { render, selek, selekFn, seleKlass } from "./lib7.js";
import { Button, Card, CardLink } from "./components.js";

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

    for (let sabor of Object.values(pizzas)) {
        sabor.forEach(pizza => {
            root.append(
                Card('container', [
                    render({ p: { id: `pizza_${ctrl++}`, class: 'pizza' } }, pizza),
                    Card('btn', [
                        Button(`btn_menos_${ctrl}`, 'menos', '-'),
                        render({ span: { id: `num_${ctrl}` } }, '0'),
                        Button(`btn_mais_${ctrl}`, 'mais', '+')
                    ])
                ])
            );
        });
    }

    const span = num => selek(`num_${num}`);

    // Adiciona pizzas no carrinho
    [...seleKlass('mais')].map(({ id }) => selekFn(id, 'click', () => span(id[9]).innerHTML = Number(span(id[9]).innerHTML) + 1));

    // Remove-as do carrinho
    [...seleKlass('menos')].map(({ id }) => selekFn(id, 'click', () => {
        if (span(id[10]).innerHTML > 0) span(id[10]).innerHTML = Number(span(id[10]).innerHTML) - 1;
    }));

    CardLink('Para finalizar o pedido Clique ', '#finalizarPedido');
}