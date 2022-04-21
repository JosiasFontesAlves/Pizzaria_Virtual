import { Lista, mapEntries, render } from '../lib7.js';
import CardLink from '../components/CardLink.js';

export default ({ pizzas }) => {
    const Container = mapEntries(pizzas, ([pizza, { valor, sabores }]) => render({
        div: {
            class: 'grid',
            id: 'container-sabores'
        }
    }, [
        render({
            h2: {
                class: 'ttl_pizza w50'
            }
        }, `${pizza} - R$${valor}`),
        Lista(`pizzas-${pizza}`, sabores, {
            class: 'padd7 pizza'
        })
    ]));

    return render({
        div: {
            id: 'container-pizzas'
        }
    }, [
        ...Container,
        CardLink('Pronto(a) para pedir? Clique ', { '#pedido': 'aqui!' })
    ]);
}
