import { mapEntries, render, Title } from '../lib7.js';
import pizzas from '../pizzas.js';
import CardLink from '../components/CardLink.js';
import Pizza from '../components/Pizza.js';

const Container = mapEntries(pizzas, ([sabor, { valor, sabores }]) =>
    render({
        section: {
            className: 'container grid padd5'
        }
    }, [
        Title(2, `${sabor} - R$${valor}`, { className: 'ttl_pizza' }),
        render({
            section: {
                className: 'sabores'
            }
        }, sabores.map(sabor => Pizza(sabor)))
    ])
);

export default render({
    div: {
        id: 'Home'
    }
}, [
    ...Container,
    CardLink({ '#pedido': 'Pronto(a) para pedir?' })
]);