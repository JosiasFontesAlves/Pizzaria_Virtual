import Carrinho from './pages/Carrinho.js';
import ContainerPizzas from './pages/Home.js';
import Pedido from './pages/Pedido.js';

export default (/** @type {{ pizzas: {}; }} */ api) => ({
    '#home': ContainerPizzas(api),
    '#pedido': Pedido(api)
});