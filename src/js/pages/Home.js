import CardLink from "../components/CardLink.js";
import { consumirAPI, Link, mapEntries, render } from "../lib7.js";

const Container = await consumirAPI('api.json', ({ pizzas, template }) => {
    const [sabor_pizza, h2_sabor] = template.home;

    return mapEntries(pizzas, ([sabor, { sabores, valor }]) => render({
        div: {
            class: 'card_pizzas',
            id: `pizzas-${sabor.toLowerCase()}`
        }
    }, [
        render(h2_sabor, `${sabor} - R$${valor}`),
        ...sabores.map(pizza => render(sabor_pizza, pizza))
    ]));
});

export default render({
    section: {
        id: 'container-pizzas',
    }
}, [
    ...Container,
    CardLink('Pronto para pedir? Clique ', Link('#pedido', 'aqui'))
]);