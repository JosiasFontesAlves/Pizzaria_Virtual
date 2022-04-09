import { SPA } from './lib7.js';
import Pedido from './pages/Pedido.js';
import Home from './pages/Home.js';
import setCarrinho from './setCarrinho.js';

export default () => {
    location.hash = '#home';

    SPA({
        '#home': Home,
        '#pedido': Pedido
    }, '#root');

    setCarrinho();
}