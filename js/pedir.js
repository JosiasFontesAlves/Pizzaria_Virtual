import pizzas from "./pizzas.js";
import { render, selek, seleKlass } from "./lib7.js";
import { Button, Card } from "./components.js";

export default () => {
    const root = selek('root'),
        { value: nome } = selek('txt');

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

    // Adiciona pizzas no carrinho
    [...seleKlass('mais')].map(btn => btn.onclick = function () {
        const span = selek(`num_${this.id[9]}`);
        span.innerHTML = Number(span.innerHTML) + 1;
    });

    // Remove-as do carrinho
    [...seleKlass('menos')].map(btn => btn.onclick = function () {
        const span = selek(`num_${this.id[10]}`);
        
        if (span.innerHTML > 0) span.innerHTML = Number(span.innerHTML) - 1;
    });

    root.appendChild(
        Card('link', [
            render('span', 'Para finalizar o pedido Clique'),
            render({ a: { href: '#finalizarPedido' } }, 'aqui!')
        ])
    );
}