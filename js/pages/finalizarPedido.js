import { Card, consumirAPI, insertChilds, render, selek, texto } from "../lib7.js";
import Link from "../components/Link.js";
import calcularValorTotal from "../valorTotal.js";

export default () => {
    location.hash = '#finalizarPedido';

    texto({ msg: 'Você escolheu:' });

    consumirAPI('/carrinho', carrinho => {
        Object.entries(carrinho).forEach(([pizza, qtde], i) => {
            if (qtde > 0) {
                selek('container-pizzas').appendChild(
                    render(
                        { p: { class: 'carrinho_pizzas', id: `item_${i}` } },
                        `${pizza} - ${qtde} unidade${qtde > 1 ? 's' : ''}`
                    )
                );
            }
        });

        calcularValorTotal();
    });

    const links = Object.entries({
        '#confirmarPedido': 'Tudo ok!, Podemos continuar',
        '#pedido': 'Não, quero mudar o pedido'
    }).map(([link, txt]) => Link(link, txt));

    insertChilds('#card-link', [
        render('h3', 'O pedido está correto?'),
        Card({ div: { id: 'links' } }, links)
    ]);
}