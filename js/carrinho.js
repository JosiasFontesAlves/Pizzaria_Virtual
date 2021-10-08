import { selek, selekFn, seleKlass } from "./lib7.js";

export default () => {
    const carrinho = {},
        span = num => selek(`num_${num}`),
        setCarrinho = id => Number(span(id).innerHTML),
        salvarCarrinho = (item, idSpan) => {
            const [qtde_pizzas, valor] = [`pizza_${item - 1}`,`valor_${idSpan}`].map(item => selek(item).innerHTML);

            carrinho[`${qtde_pizzas} ${valor}`] = setCarrinho(item);

            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        },
        indexPizza = id => {
            const index = selek(id).classList == 'mais' ? 11 : 12;

            return id.length === index ? id[index - 2] + id[index - 1] : id[index - 2];
        };

    // Adiciona pizzas no carrinho
    [...seleKlass('mais')].forEach(({ id }) => {
        selekFn(id, 'click', () => {
            span(indexPizza(id)).innerHTML = setCarrinho(indexPizza(id)) + 1;

            salvarCarrinho(indexPizza(id), indexPizza(id));
        });
    });

    // Remove-as do carrinho
    [...seleKlass('menos')].forEach(({ id }) => {
        selekFn(id, 'click', () => {
            if (span(indexPizza(id)).innerHTML > 0) {
                span(indexPizza(id)).innerHTML = setCarrinho(indexPizza(id)) - 1;

                salvarCarrinho(indexPizza(id), indexPizza(id));
            };
        })
    });
}