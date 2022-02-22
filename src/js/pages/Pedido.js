import { render } from '../lib7.js';
import CardLink from '../components/CardLink.js';
import ContainerPizzas from '../components/ContainerPizzas.js';

export default render({
    section: {
        id: 'container-pizzas',
    }
}, [
    ...ContainerPizzas, 
    CardLink(
        'Para finalizar o pedido clique',
        render({ button: { id: 'btn-carrinho' } }, 'aqui')
    )
]);
