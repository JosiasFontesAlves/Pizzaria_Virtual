import { mapEntries, render } from '../lib7.js';
import CardLink from '../components/CardLink.js';
import Pizza from '../components/Pizza.js';
import pizzas from '../pizzas.js';
import CardBtn from '../components/CardBtn.js';

const Container = mapEntries(pizzas, ([, { valor, sabores }]) =>
    render({
        section: {
            className: 'container'
        }
    }, sabores.map(sabor =>
        render({
            div: {
                className: 'flex padd5 subl_nardo'
            }
        }, [
            Pizza(`${sabor} R$${valor}`),
            CardBtn()
        ])
    ))
);

export default render({
    section: {
        className: 'w50',
        id: 'pedido'
    }
}, [
    ...Container,
    CardLink({ '#carrinho': 'Para finalizar o pedido,' })
]);