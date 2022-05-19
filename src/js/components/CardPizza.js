import { mapEntries, render, Span } from '../lib7.js';

export default (sabor, id) => {
    const [BtnMenos, BtnMais] = mapEntries({
        menos: '-', mais: '+'
    }, ([classe, value]) =>
        render({
            button: {
                class: `btn_pizza ${classe} hover_float`
            }
        }, value)
    );

    const CardBtn = render({
        div: {
            class: 'card_btn'
        }
    }, [
        BtnMenos,
        Span('0', {
            class: 'span_pizza',
            id: `span_pizza-${id}`
        }),
        BtnMais
    ]);

    return render({
        div: {
            class: 'flex padd7 pizza w50'
        }
    }, [Span(sabor, { class: 'sabor' }), CardBtn]);
};
