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

let versão = '2.9.3';

/** 
 * @param {string} local
 * @param {string} idBtn - nome do botão
 * @param {number} estilo - tipo de botão
 * @param {string} cor
 */
export function criarBotão(local, idBtn, estilo, cor) {
    const tam = ["width: 50px; height: 20px; color: rgb(80, 80, 80)", "width: 20px; height: inherit; transform: translateX(-3%)"],
        btn = {
            borda: [
                `${tam[0]}; border: 2px solid; padding: 2px; border-radius: 15px`,
                `${tam[0]}; border: 2px solid; padding: 2px;`,
                `${tam[0]}; border: 1px solid; background: lightgreen; border-radius: 25px;`,
                `${tam[0]}; background: gray; border-radius: 5px; padding: 2px;`,
                `width: 50px; height: 15px; background: darkred; border-radius: 25px; display: flex; align-items: center`,
                `${tam[0]}; border-radius: 25px; background: silver; border: 1px solid`,
            ],
            botão: [
                `${tam[1]}; background: ${cor}; border-radius: inherit;`, `${tam[1]}; background: ${cor};`,
                `width: 20px; height: inherit; background: ${cor}; border-radius: 50%;`,
                `${tam[1]}; background: ${cor}; border-radius: inherit;`,
                `width: 25px; height: 25px; background: red; border-radius: 50%;`,
                `width: 10px; height: 10px; border: 5px solid ${cor}; background: none; border-radius: 50%;`,
            ]
        },
        res = [];

    while (res.length < 2) res.push(document.createElement('div'));

    [btn.borda[estilo], `${btn.botão[estilo]} position: fixed;`].forEach((stl, i) => res[i].style = stl);

    res[1].id = idBtn;
    res[0].appendChild(res[1]);

    document.getElementById(local).appendChild(res[0]);
} /* ----- Lib de botões ----- */

export const Tempus = {
    p: () => document.createElement('p'),
    setAtr(el, id, innerHTML) {
        el.id = id;
        el.innerHTML = innerHTML;
    },
    /**
     * @param {string} id 
     * @param {number} estilo 
     */
    relógio(id, estilo) {
        const rel = this.p();

        setInterval(() => {
            const date = new Date(),
                rlg = [date.getHours(), date.getMinutes(), date.getSeconds() + 1];

            for (let x in rlg) rlg[x] < 10 ? rlg[x] = `0${rlg[x]}` : '';

            this.setAtr(rel, id, (estilo === 0) ? rlg.join(':') : (rlg.pop(), rlg.join(':')));
        }, 1000);

        return rel;
    },
    /**
     * @param {string} id 
     * @param {number} estilo 
     */
    calendário(id, estilo) {
        const cal = this.p();

        setInterval(() => {
            const date = new Date(),
                calendário = {
                    diaSem: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
                    mês: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
                },
                estilos = [
                    `${calendário.diaSem[date.getDay()]} ${date.getDate()} ${calendário.mês[date.getMonth()]} ${date.getFullYear()}`,
                    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                ];

            this.setAtr(cal, id, estilos[estilo]);
        }, 1000);

        return cal;
    },
    saudação(id) {
        const sdc = this.p(),
            hora = new Date().getHours();

        sdc.id = id;
        sdc.innerHTML = (hora <= 12) ? "Bom dia!" : (hora >= 18) ? "Boa noite!" : "Boa tarde!";

        return sdc;
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
            style.transform == `translate(0%)` && body.style.background == 'white' ?
                (style.transform = `translate(${pos})`, body.style.background = 'black') :
                (style.transform = `translate(0%)`, body.style.background = 'white');
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
    [...arguments].forEach(local => {
        Object.entries(local).map(([tag, childs]) => {
            const res = [], setElem = child => res.push(document.createElement(typeof child === 'string' ? child : Object.keys(child)[0]));
            Array.isArray(childs) ? childs.map(child => setElem(child)) : setElem(childs); // Cria os componentes
            res.forEach((el, i) => {
                if (typeof childs[i] === 'object') {
                    for (let key in childs[i]) // Caso sejam objetos aninhados, adiciona os atributos
                        Object.entries(childs[i][key]).map(([atr, val]) => el.setAttribute(atr, val));
                }
            });
            document.querySelector(tag).append(...res);
        });
    });
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

// IMPORTANTE! --> Sempre usar o templatr no topo do código!

export function templatr() {
    [...arguments].forEach(elem => {
        const el = document.createElement(typeof elem === 'string' ? elem : Object.keys(elem)[0]);
        if (typeof elem === 'object') {
            for (let tag in elem)
                Object.entries(elem[tag]).forEach(([atr, val]) => el.setAttribute(atr, val));
        }
        document.body.appendChild(el);
    });
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
            arguments[3] == 'loop' ?
                (px != pxMax) ? style.width = `${px++}px` : px = 0 :
                (style.width != `${pxMax}px`) ? style.width = `${px++}px` : '';
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
export function addClass() {
    [...arguments].forEach(({ elems, classe }) => [...elems].forEach(el => el['classList'] += classe));
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
            res.push(document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)[0]));
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
    const $grid = document.getElementById(local);
    $grid.classList += 'grid';

    for (let i = 0; i < qtde; i++) {
        const $tag = document.createElement(tag);
        $tag.classList = classe;
        $tag.id = `${id}${i}`;

        $grid.appendChild($tag);
    }
} /* --------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {object[]} tabela
 */
export const Tabela = tabela => {
    const [table, thead, tbody] = ['table', 'thead', 'tbody'].map(el => document.createElement(el));

    const tr = cont => {
        const row = document.createElement('tr');
        row.append(...cont);

        return row;
    }

    [thead, tbody].forEach(elem => table.appendChild(elem));

    const head = Object.keys(...tabela).map(th => {
        const $th = document.createElement('th');
        $th.textContent = th;

        return $th;
    });

    thead.append(tr(head));

    const $tabela = tabela.flatMap(tab => [
        Object.values(tab).map(dado => {
            const td = document.createElement('td');
            td.append(dado);

            return td;
        })
    ].map(tab => {
        const row = tr(tab);

        return row;
    }));

    tbody.append(...$tabela);

    return table;
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
    const elem = document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)[0]);

    if (typeof tag === 'object') {
        for (let el in tag) Object.entries(tag[el]).forEach(([atr, val]) => elem.setAttribute(atr, val));
    }

    if (conteúdo) elem.append(conteúdo);

    return elem;
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Container([local, tag, qtde, idContainer, idComponente])
 */
export function Container() {
    [...arguments].forEach(([local, tag, qtde, idContainer, idComponente], i) => {
        const res = [],
            container = document.createElement('section');

        for (let elem = 0; elem < qtde; elem++) // Cria os componentes
            res.push(document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)[0]));

        if (typeof tag === 'object') {
            let ctrlId = 0;

            res.forEach(el => {
                if (arguments[i].length == 5) el.id = idComponente + ctrlId++;

                for (let key in tag)
                    Object.entries(tag[key]).forEach(([atr, val]) => el.setAttribute(atr, val));
            });
        }

        container.classList.add('container');
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
        let ctrl = 0;

        for (let tag in arguments[1]) {
            Object.entries(arguments[1][tag]).forEach(([atr, val]) => searchBox.children[ctrl].setAttribute(atr, val));
            ctrl++;
        }
    }
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string} local 
 * @param {string} id 
 */
export function FormBox(local, idForm) {
    const form = document.createElement('form');
    if (idForm) form.id = idForm;

    const inputs = ['text', 'password'].map(type => {
        const input = document.createElement('input');
        input.type = type;

        return input;
    });

    form.append(...inputs, document.createElement('button'));

    document.querySelector(local).appendChild(form);
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {string} url 
 * @param {function} fn 
 */
export function consumirAPI(url, fn) {
    fetch(url)
        .then(res => res.json())
        .then(fn);
} /* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * @param {{string: function}} pages 
 * @param {function} fn - CallBack opcional
 */
export function SPA(pages, fn) {
    window.onhashchange = () => {
        if (fn) fn();

        pages[location.hash]();
    }
}

/**
 * @param {{string: string}} props 
 * @param {HTMLElement[]} elems 
 */
export function Card(props, elems) {
    const card = document.createElement('div');

    Object.entries(props).forEach(([atr, val]) => card.setAttribute(atr, val));

    card.classList.add('card');
    card.append(...elems);

    return card;
}

/**
 * @param {string} local 
 * @param {HTMLElement[]} childs 
 */
export const insertChilds = (local, childs) => document.querySelector(local).append(...childs);

console.log(`Lib 7 v${versão} - Matsa \u00A9 2021\nCriada por Josias Fontes Alves`);