import { SPA, templatr } from './lib7.js';
import Header from './components/Header.js';
import Root from './components/Root.js';
import Footer from './components/Footer.js';
import Pedido from './pages/Pedido.js';
import Home from './pages/Home.js';
import setCarrinho from './setCarrinho.js';

templatr([Header, Root, Footer]);

location.hash = '#pedido';

SPA({
    '#home': Home,
    '#pedido': Pedido
}, '#root');

setCarrinho();