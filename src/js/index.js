import { getSubstring, mapEntries, selekFn, templatr } from './lib7.js';
import Header from './components/Header.js';
import Root from './components/Root.js';
import Footer from './components/Footer.js';

templatr(Header, Root, Footer);

location.hash = '#home';

const carrinho = {};

const setCarrinho = () =>
    sessionStorage.setItem('pizzaria', JSON.stringify(carrinho));

setCarrinho();

selekFn('#root', 'click', ev => {
    if (ev.target.localName !== 'button') return;

    const [sabor, spanQtde] = [
        ...ev.composedPath()[2].children
    ].map(({ textContent }) => textContent);

    const fnBtn = {
        btn_menos: num => num > 0 ? num - 1 : 0,
        btn_mais: num => num + 1
    }

    const [fn, qtde] = mapEntries({
        [ev.target.className]: /btn_m\w+/, [spanQtde]: /\d+/
    }, ([str, start]) => getSubstring(str, start));

    const qtdePizzas = () => carrinho[sabor] = fnBtn[fn](Number(qtde));

    ev.composedPath()[1].children[1].textContent = qtdePizzas();

    setCarrinho();
});