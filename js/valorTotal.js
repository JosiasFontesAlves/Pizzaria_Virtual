import { insertChilds, render, seleKlass } from "./lib7.js";

export default () => {
    const valorTotal = [];

    [...seleKlass('carrinho_pizzas')].forEach(({ innerText }) => {
        const getIndex = i => innerText.indexOf(i),
            getSubStr = (from, to) => Number(innerText.substring(getIndex(from) + 1, getIndex(to))),
            soma = () => getSubStr('$', ' -') * getSubStr('- ', 'un');
        console.log(valorTotal);
        valorTotal.push(soma());
    });

    const res = [
        ['h3', 'Valor total:'], [{ p: { id: 'valor' } }, `R$${valorTotal.reduce((x, y) => x + y)}`]
    ].map(([tag, content]) => render(tag, content));

    insertChilds('#valorTotal', res);
}