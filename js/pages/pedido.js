import pedir from "../pedir.js";
import {
    kreatto, SearchBox, selek, selekFn, texto
} from "../lib7.js";

export default () => {
    selek('card-link').hidden = true;
    
    kreatto({
        '#root': [
            { 'h2': { id: 'sdc' } }
        ]
    });

    SearchBox('#root', {
        input: {
            id: 'txt', type: 'text',
            placeholder: 'Digite seu nome'
        }, button: { id: 'ok' }
    });

    texto(
        { sdc: 'Olá, Digite seu nome' },
        { ok: '=>' }
    );

    selekFn('ok', 'click', () => {
        const txt = selek('txt');

        if (txt.value !== '') {
            txt.style.width = '5px';
            setTimeout(pedir, 520);
        }
    });

    pedir();
}