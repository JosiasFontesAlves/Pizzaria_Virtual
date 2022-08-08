import { getSubstring, selekFn, templatr } from './lib7.js';
import Header from './components/Header.js';
import Root from './components/Root.js';
import Footer from './components/Footer.js';

templatr(Header, Root, Footer);

location.hash = '#pedido';

const carrinho = {};

const setCarrinho = () =>
    localStorage.setItem('pizzaria', JSON.stringify(carrinho));

setCarrinho();

selekFn('#root', 'click', ev => {
    if (ev.target.localName !== 'button') return;

    const [pizza, spanPizza] = [
        ev.composedPath()[2],
        ev.composedPath()[1]
    ].map(({ children }, i) => children[i]);

    const fnBtn = {
        btn_menos: num => num > 0 ? num - 1 : 0,
        btn_mais: num => num + 1
    }

    const qtdePizzas = () =>
        carrinho[pizza.textContent] = fnBtn[getSubstring(ev.target.className, /btn_m\w+/)](Number(spanPizza.textContent));

    spanPizza.textContent = qtdePizzas();

    setCarrinho();
});