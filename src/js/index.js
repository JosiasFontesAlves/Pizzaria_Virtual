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

    const [sabor, qtde] = mapEntries({
        [ev.composedPath()[2].textContent]: /\D+\d+/,
        [ev.composedPath()[1].textContent]: /\d+/
    }, ([str, regex]) => getSubstring(str, regex));

    carrinho[sabor] = qtde;

    setCarrinho();
});