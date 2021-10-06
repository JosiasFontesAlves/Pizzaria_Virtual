/*  
    * * * * * * * * * * * * *     * * * * * * * * *    * * * * * * * * * *    * * * * * * * * *     * * * * * * * * * * 
    * * * * * * * * * * * * *     * * * * * * * * *    * * * * * * * * * *    * * * * * * * * *     * * * * * * * * * * 
    * *                   * *     * *           * *            * *            * *                   * *             * *  
    * *        * *        * *     * * * * * * * * *            * *            * * * * * * * * *     * *     * *     * * 
    * *        * *        * *     * * * * * * * * *            * *            * * * * * * * * *     * *     * *     * * 
    * *        * *        * *     * *           * *            * *                          * *     * *             * * 
    * *        * *        * *     * *           * *            * *            * * * * * * * * *     * *             * * 
    * *        * *        * *     * *           * *            * *            * * * * * * * * *     * *             * * 
*/

let versão = '2.7.5';

/** 
* @param {string} local
* @param {string} idBtn - nome do botão
* @param {number} estilo - tipo de botão
* @param {string} cor
*/
export function criarBotão(local, idBtn, estilo, cor) {
    const borda = document.createElement('div');
    const botão = document.createElement('button');
    const borderRadius = [20, 0, 50, 20];
    const tam = ['border: 2px solid', 'height: inherit; width: 20px; border-radius: inherit', `border: none; background: ${cor}`];
    const estilos = {
        estiloBorda: [
            `${tam[0]}; height: 20px; width: 50px;`, `${tam[0]}; height: ${borderRadius[0]}px; width: 53px`,
            'background: silver; height: 13px; width: 50px', `${tam[0]}; height: 18px; padding: 2px; width: 55px`
        ],
        estiloBotão: [
            `${tam[2]}; ${tam[1]}`, `${tam[2]}; height: 18px; width: 18px; left: 11px`,
            `${tam[2]}; height: 23px; width: 23px; border-radius: 50%`,
            `height: 20px; width: 20px; border-radius: 50%; background: none; border: 5px solid ${cor}`
        ]
    };

    borda.style = `${estilos.estiloBorda[estilo]}; border-radius: ${borderRadius[estilo]}px; display: flex; align-items: center`;
    botão.style = `${estilos.estiloBotão[estilo]}; position: absolute;`;

    botão.id = idBtn;

    borda.appendChild(botão);

    document.getElementById(local).appendChild(borda);
} /* ----- Lib de botões ----- */

export class Tempus {
    /**
    * @param {string} idRel 
    * @param {number} estilo 
    */
    static relógio(idRel, estilo) {
        setInterval(() => {
            const data = new Date(), rlg = [data.getHours(), data.getMinutes(), data.getSeconds()];

            for (let x in rlg) rlg[x] < 10 ? rlg[x] = `0${rlg[x]}` : '';

            const rel = [rlg.join(':'), (rlg.pop(), rlg.join(':'))];

            document.getElementById(`${idRel}`).innerHTML = rel[estilo];
        }, 1000);
    }

    /**
    * @param {string} idCal 
    * @param {number} estilo 
    */
    static calendário(idCal, estilo) {
        setInterval(() => {
            const data = new Date(), calendário = {
                diaSem: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
                mês: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
            }

            const cal = [
                `${calendário.diaSem[data.getDay()]} ${data.getDate()} ${calendário.mês[data.getMonth()]} ${data.getFullYear()}`,
                `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
            ];

            document.getElementById(`${idCal}`).innerHTML = cal[estilo];
        }, 1000);
    }

    /**
    * @param {string} idSau 
    */
    static saudação = idSau => {
        const hora = new Date().getHours();

        document.getElementById(`${idSau}`).innerHTML = (hora <= 12) ? "Bom dia!" : (hora >= 18) ? "Boa noite!" : "Boa tarde!";
    }

    static count(cond, varCtrl) { // Usar apenas nas funções de contagem
        if (cond) clearInterval(varCtrl);
    }
    /**
    * @param {number} contador
    * @param {function} fn
    * @param {number} vel 
    */
    static contagemRegressiva(contador, fn, vel) {
        const cont = setInterval(() => {
            fn();
            contador--;
            this.count(contador == 0, cont);
        }, vel);
    }

    /**
    * @param {number} contador 
    * @param {number} varCtrl 
    * @param {function} fn 
    * @param {number} vel 
    */
    static contagem(contador, varCtrl, fn, vel) {
        const c = setInterval(() => {
            fn();
            contador++;
            this.count(contador >= varCtrl, c);
        }, vel);
    }
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
* @param {string} id 
*/
export const selek = id => document.getElementById(id);

/**
* @param {Element} elem 
*/
export const sElem = elem => document.querySelector(elem);

/**
* @param {string} id 
* @param {EventListener} ev 
* @param {function} fn 
*/
export const selekFn = (id, ev, fn) => document.getElementById(id).addEventListener(ev, fn);

/**
 * @param {Element} elem 
 * @param {EventListener} ev 
 * @param {function} fn 
 */
export const sElemFn = (elem, ev, fn) => document.querySelector(elem).addEventListener(ev, fn);

/**
* @param {Element} classe 
*/
export const seleKlass = classe => document.getElementsByClassName(classe);
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
* @param {string} id 
* @param {string[]} pos 
*/
export function temEsc(id, pos) {
    document.getElementById(id).addEventListener('click', function () {
        const { body } = document, { style } = this;

        if (pos.length <= 2) {
            style.transform == `translate(0%)` && body.style.background == 'white'
                ? (style.transform = `translate(${pos})`, body.style.background = 'black')
                : (style.transform = `translate(0%)`, body.style.background = 'white');
        }
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
* @param {string} id 
* @param {number} px 
*/
export function menuLateral(id, px) {
    const { style } = document.querySelector('aside'), pos = [`translateX(${px}px)`, 'translateX(0)'];
    style.transform = pos[0];
    document.getElementById(id).addEventListener('click', () => style.transform = (style.transform == pos[0]) ? pos[1] : pos[0]);
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

export function kreatto() {
    [...arguments].forEach(arg => {
        for (let elem in arg) {
            const res = [];
            for (let tag of arg[elem]) { // Cria os componentes
                res.push(document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)));
                res.forEach((el, i) => {
                    if (typeof arg[elem][i] === 'object') {
                        for (let key in arg[elem][i]) // Caso sejam objetos aninhados, adiciona os atributos
                            Object.entries(arg[elem][i][key]).forEach(([atr, val]) => el.setAttribute(atr, val));
                    }
                });
                document.querySelector(elem).append(...res);
            }
        }
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

// IMPORTANTE! --> Sempre usar o templatr no topo do código!

export function templatr() {
    const { body } = document, res = [];
    [...arguments].forEach(elem => res.push(document.createElement(typeof elem === 'string' ? elem : Object.keys(elem))));
    res.forEach((el, i) => {
        if (typeof arguments[i] === 'object') {
            for (let tag in arguments[i])
                Object.entries(arguments[i][tag]).forEach(([atr, val]) => el.setAttribute(atr, val));
        }
    });
    body.append(...res);
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/** 
* @param {object} arguments
* @param {string} arguments.id - local do texto 
* @param {string} arguments.texto 
*/
export function texto() {
    [...arguments].forEach(el => document.getElementById(Object.keys(el)).append(...Object.values(el)));
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

export class Animatus {
    static barr(id, pxMax, vel) {
        const { style } = document.getElementById(id);
        let px = 0;
        setInterval(() => {
            arguments[3] == 'loop'
                ? (px != pxMax) ? style.width = `${px++}px` : px = 0
                : (style.width != `${pxMax}px`) ? style.width = `${px++}px` : '';
        }, vel);
    }

    static girar(id, z, vel) {
        const { style } = document.getElementById(id);
        let ang = 0;
        setInterval(() => (ang != z) ? style.transform = `rotateZ(${ang++}deg)` : ang = 0, vel);
    }
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

export function dropDown() {
    [...arguments].forEach(({ local, lista, btn }) => {
        const $local = document.getElementById(local);

        $local.hidden = true;
        $local.append(...lista);

        document.querySelector(btn).onclick = () => $local.hidden = $local.hidden == true ? false : true;
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
* @param {object} arguments
* @param {HTMLElement[]} arguments.elems
* @param {string} arguments.classe
*/
export function addClass({ elems, classe }) {
    [...arguments].forEach(x => [...x.elems].forEach(el => el['classList'] += x.classe));
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

export function replacer() {
    [...arguments].forEach(pesq => {
        for (let local in pesq) {
            for (let res in pesq[local]) {
                let str = document.querySelector(local);
                str.innerHTML = str.innerHTML.replace(`{{${res}}}`, pesq[local][res]);
            }
        }
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

export function jacss() {
    let css = [];
    [...arguments].forEach(tags => {
        for (let x in tags) {
            let atr = [];
            for (let k in tags[x])
                atr.push(`  \n   ${k}: ${tags[x][k]};`);
            css.push(`  \n${x} {${atr.join('')} \n}`);
        }
    });
    document.head.innerHTML += `<style id="jacss">${css.join('\n')}</style>`;
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

export function criarLista() {
    [...arguments].forEach(([local, lista, tag]) => {
        const res = [];

        lista.forEach((item, i) => {
            res.push(document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)));
            res[i].append(item);

            if (typeof tag === 'object') {
                for (let el in tag) Object.entries(tag[el]).forEach(([atr, val]) => res[i].setAttribute(atr, val));
            }
        });

        document.getElementById(local).append(...res);
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/*
 * Gera um id numérico para a classe
 * Sintaxe -> [classe, id]
 */
export function addId() {
    [...arguments].forEach(el => {
        let cl = [...document.getElementsByClassName(el[0])];

        for (let id in cl) cl[id].id = `${el[1] + id}`;
    });
}
/* --------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string} classe 
 * @param {number} qtde 
 * @param {string} id
 * @param {string} local
 * @param {string} tag
 */
export function grid(classe, qtde, id, local, tag) {
    let el = document.getElementById(local);
    el.classList += 'grid';
    for (let i = 0; i < qtde; i++) {
        el.innerHTML += `<${tag} class="${classe}"></${tag}>`;
        if (arguments.length >= 3) [...document.getElementsByClassName(arguments[0])][i].id = `${id}${i}`;
    }
} /* --------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string} local 
 * @param {string} classeCol 
 * @param {string} classeFila 
 * @param {object[]} tabela 
 */
export function criarTabela(local, classeCol, classeFila, tabela) {
    const tab = document.getElementById(local), col = [], { style } = tab;

    for (let x in tabela) {
        let row = [];
        for (var y in tabela[x]) {
            row.push(`<p class="${classeFila}">${tabela[x][y]}</p>`);
        }
        col.push(`<div class="${classeCol} "> <p class="${classeFila} tabCol">${x}</p> ${row.join('\n')}</div>`);
    }

    style.display = 'flex';
    style.width = 'fit-content';
    tab.innerHTML += col.join('\n');
} /* --------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string[]} urls
 */
export function addCSS([_urls]) {
    [...arguments].forEach(url => document.head.innerHTML += `<link rel="stylesheet" href="${url}">`);
}

/**
* @param {object | string} elem 
* @param {string} conteúdo
*/
export function render(tag, conteúdo) {
    const elem = document.createElement(typeof tag === 'string' ? tag : Object.keys(tag));

    if (typeof tag === 'object') {
        for (let el in tag) Object.entries(tag[el]).forEach(([atr, val]) => elem.setAttribute(atr, val));
    }

    if (conteúdo) elem.append(conteúdo);

    return elem;
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {object} arguments
 * @param {string} arguments._local 
 * @param {string | object} arguments._tag 
 * @param {number} arguments._qtde
 */
export function Container([_local, _tag, _qtde, _idContainer, _idComponente]) {

    [...arguments].forEach(([local, tag, qtde, idContainer, idComponente], i) => {
        const res = [], container = document.createElement('section');

        for (let elem = 0; elem < qtde; elem++) // Cria os componentes
            res.push(document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)));

        if (typeof tag === 'object') {
            let ctrlId = 0;

            res.forEach(el => {
                if (arguments[i].length == 5) el.id = idComponente + ctrlId++;

                for (let key in tag)
                    Object.entries(tag[key]).forEach(([atr, val]) => el.setAttribute(atr, val));
            });
        }

        container.classList = 'container';
        container.id = idContainer;
        container.append(...res);

        document.querySelector(local).appendChild(container);
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string} local 
 */
export function SearchBox(local) {
    const searchBox = document.createElement('section');
    searchBox.classList = 'searchBox';
    searchBox.append(...['input', 'button'].map(elem => document.createElement(elem)));

    document.querySelector(local).appendChild(searchBox);

    if (typeof arguments[1] === "object") {
        for (let el in arguments[1]) {
            for (let atr in arguments[1][el])
                document.querySelector(el)[atr] = arguments[1][el][atr];
        }
    }
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string} local 
 * @param {string} id 
 */
export function FormBox(local, idForm) {
    const form = document.createElement('form'), inputs = [];
    form.id = idForm;

    ['text', 'password'].forEach((type, i) => {
        inputs.push(document.createElement('input'));
        inputs[i].type = type;
    });

    form.append(...inputs, document.createElement('button'));

    document.querySelector(local).appendChild(form);
}  /* ----------------------------------------------------------------------------------------------------------------------------------------- */

console.log(`Lib 7 v${versão} - Matsa \u00A9 2021\nCriada por Josias Fontes Alves`);