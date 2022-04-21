import { LinkBar, mapEntries, render, Span } from '../lib7.js';

const $valorTotal = valorTotal => render({
    'section': {
        class: 'item_carrinho padd7',
        id: 'valor-total'
    }
}, [
    render('b', 'Valor Total:'),
    Span(`R$${valorTotal}`, {
        class: 'span_valor'
    })
]);

const LinkBox = render({
    section: {
        id: 'linkBox'
    }
}, [
    render({
        h3: {
            id: 'ttl-linkBox'
        }
    }, 'O pedido está correto?'),
    LinkBar({
        '#pagamento': 'Sim, podemos continuar',
        '#home': 'Não, quero mudar o pedido'
    }, {}, { class: 'padd7' })
]);

export default ({ carrinho }) => {
    const valorTotal = [];

    const $carrinho = mapEntries(carrinho, ([item, qtde]) => {
        const [sabor, valor] = item.split(' - ');

        valorTotal.push(qtde * valor.match(/\d+/)[0]);

        const SpanCard = mapEntries({
            span_sabor: `${qtde} pizza${qtde > 1 ? 's' : ''} de ${sabor}`,
            span_valor: `${valor} cada`
        }, ([classe, txt]) => Span(txt, { class: classe }));

        return render({
            p: {
                class: 'item_carrinho padd5'
            }
        }, SpanCard);
    });

    return render({
        section: {
            id: 'carrinho'
        }
    }, [
        render({
            h2: {
                id: 'ttl-carrinho'
            }
        }, 'Você escolheu:'),
        ...$carrinho,
        $valorTotal(valorTotal.reduce((x, y) => x + y, 0)),
        LinkBox
    ]);
}