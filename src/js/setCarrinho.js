import { getSubstring, httpPost, replacer, selek, selekFn } from './lib7.js';
import Carrinho from './pages/Carrinho.js';

export default (/** @type {{}} */ api) => {
    const carrinho = {};

    const atualizarCarrinho = ({ path, target }) => {
        const [pizza, spanPizza] = [
            path[2], path[1]
        ].map(({ children }, i) => children[i]);

        const qtdePizzas = () => Number(spanPizza.textContent);

        const fnLocalName = {
            a: () => {
                if (location.hash === '#pedido') {
                    const root = selek('#root');
                    root.innerHTML = '';
                    root.appendChild(Carrinho(api));

                    api.carrinho = {};
                }
            },
            button: () => {
                const fnBtn = {
                    menos: num => num > 0 ? num - 1 : 0,
                    mais: num => num + 1
                }

                replacer({
                    [`#${spanPizza.id}`]: fnBtn[getSubstring(target.className, /[m].+[s]/)](qtdePizzas())
                });

                carrinho[`${pizza.textContent}`] = qtdePizzas();

                api.carrinho = carrinho;

                httpPost('/api', api);
            }
        }

        if (fnLocalName[target.localName]) fnLocalName[target.localName]();
    };

    selekFn('#root', 'click', atualizarCarrinho);
}