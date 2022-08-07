import { render, Span } from '../lib7.js';

export default () => {
    const Btn = (className, textContent) =>
        render({
            button: {
                className: `btn btn_${className} hover_float`, textContent
            }
        });

    return render({
        div: {
            className: 'card_btn'
        }
    }, [
        Btn('menos', '-'),
        Span('0', { className: 'qtde' }),
        Btn('mais', '+')
    ]);
};