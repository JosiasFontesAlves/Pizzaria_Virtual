import { selekFn, seleKlass } from "./lib7.js";
import setCarrinho from "./setCarrinho.js";

export default () => {
    const carrinho = {};

    ['btn_menos', 'btn_mais'].map(classe => {
        [...seleKlass(classe)].map(({ id }) => {
            selekFn(id, 'click', ({ path, target: { classList } }) => {
                const toNumber = str => Number(str),
                    fnClasse = {
                        btn_mais: num => toNumber(num) + 1,
                        btn_menos: num => (num > 0) ? toNumber(num) - 1 : 0
                    },
                    qtdePizzas = () => path[1].children[1].textContent;

                path[1].children[1].textContent = fnClasse[classList](qtdePizzas());

                // Adiciona/remove as pizzas do carrinho
                carrinho[path[2].children[0].textContent] = qtdePizzas();

                setCarrinho(JSON.stringify(carrinho));
            });
        });
    });
}