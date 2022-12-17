import { AJAX, getSubstring, selekFn, templatr } from './lib7.js';
import Header from './components/Header.js';
import Root from './components/Root.js';
import Footer from './components/Footer.js';

templatr(Header, Root, Footer);

location.hash = '#home';

const carrinho = {};

const setCarrinho = () => AJAX.set('/api', carrinho);

setCarrinho();

selekFn('#root', 'click', ev => {
    if (ev.target.localName !== 'button') return;

    const { textContent } = ev.composedPath()[2],
        [sabor, [, qtde]] = getSubstring(textContent, /\D+\d+/g);

    carrinho[sabor] = Number(qtde);

    setCarrinho();
});