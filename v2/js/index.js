import { render, selek, sElem, SPA, templatr } from "./lib7.js"; // v3.1.7
import template from "./template.js";
import home from "./pages/home.js";
import pedido from "./pages/pedido.js";
import finalizarPedido from "./pages/finalizarPedido.js";

const { container, copyright, index } = template;

templatr(...index);

selek('root').appendChild(render(container));

sElem('footer').appendChild(render(...copyright));

window.onload = () => {
    // home();
    pedido();

    SPA({
        '#home': home,
        '#pedido': pedido,
        '#finalizarPedido': finalizarPedido
    }, () => ['container-pizzas', 'card-link'].forEach(el => selek(el).innerHTML = ''));
}