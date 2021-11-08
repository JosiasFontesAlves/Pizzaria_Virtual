import { Card, insertChilds, render, selek, sElem, templatr } from "./lib7.js";
import pizzas from "../../js/pizzas.js";

templatr(
    { div: { id: 'root' } },
    { div: { id: 'card-link', class: 'w100' } },
    { footer: { class: 'fix w100' } }
);

selek('root').appendChild(
    render({ section: { id: 'container-pizzas' } })
);

Object.entries(pizzas).map(([sabor, pizzas], i) => {
    const valor = [25, 25, 35];

    selek('container-pizzas').appendChild(
        Card({ div: { class: `pizzas_${sabor}` } }, [
            render({ h2: { class: 'sabores' } }, `Pizzas ${sabor} R$${valor[i]}`),
            ...pizzas.map(pizza => render({ p: { class: 'pizza' } }, pizza))
        ])
    );
});

insertChilds('#card-link', [
    render('span', 'Pronto(a) para pedir? Clique '),
    render({ a: { href: '#pedido' } }, 'aqui!')
]);

sElem('footer').appendChild(render({ p: { id: 'copyright' } }, 'Matsa \u00A9 2021 - Josias Fontes Alves'));