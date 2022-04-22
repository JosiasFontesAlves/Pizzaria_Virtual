import { mapValues, render } from '../lib7.js';
import CardPizza from '../components/CardPizza.js';
import CardLink from '../components/CardLink.js';

export default ({ pizzas }) => {
    let id = 0;

    const $pizzas = mapValues(pizzas, ({ sabores, valor }) => {
        return render({
            div: {
                class: 'card_pizzas'
            }
        }, sabores.map(
            sabor => CardPizza(`${sabor} - R$${valor}`, id++)
        ));
    });

    return render({
        div: {
            class: 'grid',
            id: 'container-pizzas'
        }
    }, [
        ...$pizzas,
        CardLink('Para finalizar o pedido, clique ', {
            '#pedido': 'aqui'
        })
    ]);
}