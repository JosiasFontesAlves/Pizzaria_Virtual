import { Router } from '../lib7.js';
import Home from '../pages/Home.js';
import Pedido from '../pages/Pedido.js';
import Carrinho from '../pages/Carrinho.js';
import setCarrinho from '../setCarrinho.js';

export default Router({
    '#home': Home,
    '#pedido': Pedido,
    '#carrinho': Carrinho
}, { id: 'root' }, hash => setCarrinho(hash));