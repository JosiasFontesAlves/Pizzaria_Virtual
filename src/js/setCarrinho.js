import { consumirAPI, getValues, httpPost, insertChilds, mapEntries, replacer, selek, selekFn } from './lib7.js';
import Carrinho from './components/Carrinho.js';

export default () => consumirAPI('api.json', api => {
    const carrinho = {};
    const setAPI = () => httpPost('api', api);

    const mostrarValorTotal = () => {
        const root = selek('#root');
        const valorTotal = mapEntries(
            api.carrinho, ([sabor, valor]) => Number(sabor.match(/\d+/)[0]) * valor
        ).reduce((a, b) => a + b, 0);

        root.innerHTML = '';

        insertChilds('#root', [Carrinho(api, valorTotal)]);

        api.carrinho = {};

        setAPI();
    }

    const AtualizarCarrinho = (path, target) => {
        const [pizza, spanPizza] = [
            path[2], path[1]
        ].map(({ children }, i) => children[i]);

        const qtdePizzas = () => Number(spanPizza.textContent);

        const fnBtn = {
            btn_menos: num => num > 0 ? num - 1 : 0,
            btn_mais: num => num + 1
        };

        replacer({
            [`#${spanPizza.id}`]: {
                [qtdePizzas()]: fnBtn[target.classList[0]](qtdePizzas())
            }
        });

        carrinho[`${pizza.textContent}`] = qtdePizzas();

        api.carrinho = carrinho;

        setAPI();
    }

    selekFn('#root', 'click', ({ path, target }) => {
        if (target.classList.contains('fn')) AtualizarCarrinho(path, target);

        if (target.id === 'btn-carrinho' && getValues(api.carrinho).length !== 0) mostrarValorTotal();
    });
});