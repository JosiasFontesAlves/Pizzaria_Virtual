import { consumirAPI, getValues, httpPost, insertChilds, mapEntries, selek, selekFn } from './lib7.js';
import Carrinho from './components/Carrinho.js';

export default () => consumirAPI('api.json', api => {
    const carrinho = {};
    const setAPI = () => httpPost('api', api);

    selekFn('#root', 'click', ({ path, target }) => {
        const [pizza, spanPizza] = [
            path[2], path[1]
        ].map(({ children }, i) => children[i]);
        const toNumber = () => Number(spanPizza.textContent);


        if (target.classList.contains('fn')) {
            const fnBtn = {
                btn_menos: num => num > 0 ? num - 1 : 0,
                btn_mais: num => num + 1
            }

            spanPizza.textContent = fnBtn[target.classList[0]](toNumber());

            carrinho[`${pizza.textContent}`] = toNumber();

            api.carrinho = carrinho;

            setAPI();
        }

        if (target.id === 'btn-carrinho' && getValues(api.carrinho).length !== 0) {
            const root = selek('#root');
            const valorTotal = mapEntries(api.carrinho, ([sabor, valor]) =>
                sabor.substring(sabor.indexOf('$') + 1) * valor
            ).reduce((a, b) => a + b, 0);

            root.innerHTML = '';

            insertChilds('#root', [Carrinho(api, valorTotal)]);

            api.carrinho = {};
     
            setAPI();
        }
    });
});