import { Card, render } from "../lib7.js";
import template from "../template.js";
import getPizzas from "../getPizzas.js";

const { templatePizzas: [sabores, $pizza], valor } = template;

export default getPizzas(([sabor, pizzas]) => Card({ div: { class: `pizzas_${sabor}` } }, [
    render(sabores, `Pizzas ${sabor} R$${valor[sabor]}`),
    ...pizzas.map(pizza => render($pizza, pizza))
]));