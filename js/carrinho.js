import { selek, selekFn, seleKlass } from "./lib7.js";

export default () => {
    const carrinho = {},
        span = num => selek(`num_${num}`), 
        setCarrinho = id => Number(span(id).innerHTML),
        salvarCarrinho = () => localStorage.setItem('carrinho', JSON.stringify(carrinho)),
        indexPizza = (id, index) => id.length === index ? id[index - 2] + id[index - 1] : id[index - 2];

    // Adiciona pizzas no carrinho
    [...seleKlass('mais')].forEach(({ id }) => {
        const $indexPizza = indexPizza(id, 11);

        selekFn(id, 'click', () => {
            span($indexPizza).innerHTML = setCarrinho($indexPizza) + 1;

            carrinho[selek(`pizza_${$indexPizza - 1}`).innerHTML] = setCarrinho($indexPizza);

            salvarCarrinho();
        });
    });

    // Remove-as do carrinho
    [...seleKlass('menos')].forEach(({ id }) => {
        selekFn(id, 'click', () => {
            const $indexPizza = indexPizza(id, 12);

            if (span($indexPizza).innerHTML > 0) {
                span($indexPizza).innerHTML = setCarrinho($indexPizza) - 1;

                carrinho[selek(`pizza_${$indexPizza - 1}`).innerHTML] = setCarrinho($indexPizza);
                
                salvarCarrinho();
            };
        })
    });

}