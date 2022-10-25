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

    const sabor = getSubstring(ev.composedPath()[2].textContent, /\D+\d+/),
        spanQtde = ev.composedPath()[1].children[1];

    const fnBtn = {
        btn_menos: num => num > 0 ? num - 1 : 0,
        btn_mais: num => num + 1
    }

    const [qtde, fn] = mapEntries({
        [ev.target.className]: /btn_m\w+/, [spanQtde.textContent]: /\d+/
    }, ([str, start]) => getSubstring(str, start));

    const qtdePizzas = () => carrinho[sabor] = fnBtn[fn](Number(qtde));

    spanQtde.textContent = qtdePizzas();

    setCarrinho();
});