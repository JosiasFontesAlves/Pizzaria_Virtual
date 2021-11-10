import { insertChilds, render, selek, sElem, SPA, templatr } from "./lib7.js"; // v3.1.7
import template from "./template.js";
import home from "./pages/home.js";
import pedido from "./pages/pedido.js";
import finalizarPedido from "./pages/finalizarPedido.js";
import setCarrinho from "./setCarrinho.js";

const { copyright, index, root_childs } = template;

templatr(...index);

insertChilds('#root', root_childs.map(child => render(child)));

sElem('footer').appendChild(render(...copyright));

window.onload = () => {
    setCarrinho('');

    home();

    SPA({
        '#home': home,
        '#pedido': pedido,
        '#finalizarPedido': finalizarPedido
    }, () => ['container-pizzas', 'card-link', 'msg', 'valorTotal'].forEach(el => selek(el).innerHTML = ''));
}