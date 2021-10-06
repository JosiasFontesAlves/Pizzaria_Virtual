import { render, selek, sElem, templatr } from "./lib7.js";
import home from "./pages/home.js";
import pedido from "./pages/pedido.js";
import finalizarPedido from "./pages/finalizarPedido.js";


templatr(
    { div: { id: 'root' } },
    { footer: { class: 'fix w100' } }
);

sElem('footer').appendChild(
    render({ p: { id: 'copyright' } }, 'Matsa \u00A9 2021 - Josias Fontes Alves')
);

window.onload = () => {
    //home();
    pedido();

    const pages = {
        '#home': home,
        '#pedido': pedido,
        '#finalizarPedido' : finalizarPedido
    }

    window.onhashchange = () => {
        selek('root').innerHTML = '';

        pages[location.hash]();
    }
}