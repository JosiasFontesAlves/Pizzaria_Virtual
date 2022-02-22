import { consumirAPI, mapValues } from '../lib7.js';
import Pizza from './Pizza.js';

export default await consumirAPI('api.json', ({ pizzas }) => {
    const $sabores = [];

    mapValues(pizzas, ({ valor, sabores }) => 
        $sabores.push(...sabores.map(sabor => `${sabor} - R$${valor}`))
    );

    return $sabores.map(sabor => Pizza(sabor));
});
