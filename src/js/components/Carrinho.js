import { LinkBar, mapEntries, render } from '../lib7.js';

const Pizza = (qtde, sabor) => render({
    p: {
        class: 'sabor_pizza'
    }
}, `${qtde} pizza${qtde > 1 ? 's' : ''} de ${sabor} cada`);

const Carrinho = api => {
    for (let pizza in api.carrinho) {
        if (api.carrinho[pizza] == 0) delete api.carrinho[pizza];
    }

    return mapEntries(api.carrinho, ([sabor, qtde]) => Pizza(qtde, sabor));
}

export default (api, total) => {
    const { carrinho, valorTotal } = api.template;

    return render(carrinho, [
        render('h3', 'Você escolheu: '),
        ...Carrinho(api),
        render(valorTotal, `Valor total: R$${total}`),
        LinkBar({
            '#confirmarPedido': 'Tudo ok!, Podemos continuar',
            '#home': 'Não, quero mudar o pedido'
        })
    ]);
}