import { render, selek, sElem, templatr } from "./lib7.js";
import home from "./pages/home.js";
import pedido from "./pages/pedido.js";
import finalizarPedido from "./pages/finalizarPedido.js";

templatr(
    { div: { id: 'root' } },
    { div: { id: 'card-link', class: 'w100' } },
    { footer: { class: 'fix w100' } }
);

sElem('footer').appendChild(
    render({ p: { id: 'copyright' } }, 'Matsa \u00A9 2021 - Josias Fontes Alves')
);

window.onload = () => {
    home();
    //pedido();

    const pages = {
        '#home': home,
        '#pedido': pedido,
        '#finalizarPedido': finalizarPedido
    }

    window.onhashchange = () => {
        ['root', 'card-link'].forEach(el => selek(el).innerHTML = '');

        pages[location.hash]();
    }
}