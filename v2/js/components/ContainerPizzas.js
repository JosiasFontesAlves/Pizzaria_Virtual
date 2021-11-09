import { Card, render } from "../lib7.js";
import template from "../template.js";
import getPizzas from "../getPizzas.js";

const { templatePizzas: [sabores, $pizza], valor } = template;

export default getPizzas(([sabor, pizzas], i) => Card({ div: { class: `pizzas_${sabor}` } }, [
    render(sabores, `Pizzas ${sabor} R$${valor[i]}`),
    ...pizzas.map(pizza => render($pizza, pizza))
]));