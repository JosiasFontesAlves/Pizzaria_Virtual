import pizzas from "../pizzas.js";
import { Container, criarLista, render, selek } from "../lib7.js";
import { CardLink } from "../components.js";

export default () => {
    location.hash = '#home';

    Container(['#root', { div: { class: 'pizzas' } }, 3, 'container-pizzas', 'pizzas_']);

    CardLink('Pronto(a) para pedir? Clique ', '#pedido');

    let ctrl = 0;
    const valor = [0, 25, 25, 35];

    for (let sabor in pizzas) {
        selek(`pizzas_${ctrl++}`).append(
            render({ h2: { class: 'sabores' } }, `Pizzas ${sabor} R$${valor[ctrl]}`),
            render({ ul: { id: sabor } })
        );

        criarLista([sabor, [...pizzas[sabor]], 'li']);
    }
}