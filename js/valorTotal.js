import { render, selek, seleKlass } from "./lib7.js";

export default () => {
    const valorTotal = [];
    
    [...seleKlass('carrinho_pizzas')].forEach(({ innerText }) => {
        const getIndex = i => innerText.indexOf(i),
            getSubStr = (from, to) => innerText.substring(getIndex(from) + 1, getIndex(to)),
            soma = () => Number(getSubStr('$', ' -')) * Number(getSubStr('- ', 'un'));

        valorTotal.push(soma());
    });

    selek('valorTotal').append(
        render('h3', 'Valor total:'),
        render({ p: { id: 'valor' } }, `R$${valorTotal.reduce((x, y) => x + y)}`)
    );
}