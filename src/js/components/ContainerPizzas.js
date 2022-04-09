import { consumirAPI, getValues, mapValues } from '../lib7.js';
import Pizza from './Pizza.js';

export default await consumirAPI('api.json', ({ pizzas }) => {
    const $sabores = getValues(pizzas)
        .flatMap(({ valor, sabores }) => mapValues(sabores, sabor => `${sabor} - R$${valor}`))
        .map((pizza, id) => Pizza(pizza, `pizza-${id}`));
        
    return $sabores;
});