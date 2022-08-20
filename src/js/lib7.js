/**
 * * * * * * * * * * * * *     * * * * * * * * *    * * * * * * * * * *    * * * * * * * * *     * * * * * * * * * * 
 * * * * * * * * * * * * *     * * * * * * * * *    * * * * * * * * * *    * * * * * * * * *     * * * * * * * * * * 
 * *                   * *     * *           * *            * *            * *                   * *             * *  
 * *        * *        * *     * * * * * * * * *            * *            * * * * * * * * *     * *     * *     * * 
 * *        * *        * *     * * * * * * * * *            * *            * * * * * * * * *     * *     * *     * * 
 * *        * *        * *     * *           * *            * *                          * *     * *             * * 
 * *        * *        * *     * *           * *            * *            * * * * * * * * *     * *             * * 
 * *        * *        * *     * *           * *            * *            * * * * * * * * *     * *             * * 
 * @author Josias Fontes Alves
*/

let versão = '4.7.2';

/**
 * @param {{[tag: string]: {[prop: string]: string | number}} | string} tag 
 * @param {string | Node | Node[]} [childs]
 */
export const Component = (tag, childs) => {
    const $elem = document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)[0]);

    if (typeof tag === 'object')
        for (const props of Object.values(tag)) Object.entries(props).forEach(([prop, val]) => $elem[prop] = val);

    if (childs) Array.isArray(childs) ? childs.map(item => $elem.append(item)) : $elem.append(childs);

    return $elem;
}

/**
 * @param {string} idBtn
 * @param {number} estilo 
 * @param {string | string[]} cor
 * @param {{ height?: number, value?: string, props?: {[prop: string]: string}, width?: number }} propsBtn - tamanho em px
 */
export const Btn = (idBtn, estilo, cor, { height, value, props, width }) => {
    const setCor = (/** @type {number} */ i, /** @type {string | string[]} */ bg) => Array.isArray(cor) ? cor[i] : bg;
    const [h25, h_inherit] = [25, 'inherit'].map(h => `height: ${height ?? h}px;`);
    const h15 = `${height ?? 15}px`;
    const w25 = `width: ${width ?? 25}px;`, w25px = `width: ${width * 2.5}px;`;

    if (estilo === 7) {
        const btn7 = Component({
            button: {
                id: idBtn,
                ...props,
            }
        }, value);

        Object.entries({ background: cor, height, width }).forEach(([prop, val]) => {
            if (prop) btn7.style[prop] = val + (prop === 'background' ? '' : 'px');
        });

        return btn7;
    }

    const atrs = [
        `background: ${cor[1]}; border: 2px solid; padding: 2px; height: ${height ?? 20}px; ${w25px}`,
        `background: ${setCor(0, cor)}; border: none; height: inherit; ${w25}`,
        `background: ${setCor(1, '#d8d8d8')};`, `border-radius: ${height ?? 25}px; ${h25}`,
    ],
        btn = {
            div: [
                `${atrs[0]} border-radius: 15px;`, atrs[0], `${atrs[0]} border-radius: 7px;`,
                `${atrs[2]}; height: 15px; border-radius: 10px; display: flex; align-items: center; width: ${width * 2.2}px`,
                `${atrs[2]} ${atrs[3]} border: 1px solid; ${w25px}`,
                `${atrs[2]}; border: 2px solid; ${atrs[3]} padding: 5px; ${w25px}`,
                `border: 1px solid ${setCor(0, cor)}; border-radius: ${h15}; height: ${height}px; width: ${(width ?? 15) * 2}px;`
            ],
            button: [
                `${atrs[1]} border-radius: inherit;`, atrs[1], `${atrs[1]} border-radius: 5px`,
                `background: ${setCor(0, cor)}; border: none; border-radius: 50%; ${h25} ${w25}`,
                `border: 5px solid ${setCor(0, cor)}; background: none; border-radius: 50%; ${h_inherit} ${w25}`,
                `${atrs[1]} border-radius: 50%;`,
                `background: ${setCor(0, cor)}; border: none; border-radius: ${h15} 0 0 ${h15}; height: ${h15}; width: ${width ?? 15}px;`
            ]
        },
        [borda, botão] = ['div', 'button'].map(elem => Component({
            [elem]: {
                style: btn[elem][estilo]
            }
        }));

    borda.id = idBtn;
    botão.id = `${idBtn}-child`;
    borda.style.display = 'flex';

    if (props && estilo !== 7) Object.entries(props).forEach(([prop, val]) => botão.setAttribute(prop, val));

    Object.entries({
        cursor: 'pointer',
        'margin-left': '-1px',
        position: 'fixed'
    }).forEach(([prop, val]) => botão.style[prop] = val);

    borda.appendChild(botão);

    return borda;
} /* ----- Lib de botões ----- */

export const Tempus = {
    getCal: {
        diaSem: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
        mês: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    },
    getRlg: () => {
        const date = new Date();

        return [
            date.getHours(), date.getMinutes(), date.getSeconds()
        ].map(num => num < 10 ? `0${num}` : num);
    },
    /**
     * @param {number} estilo - 0: relógio completo; 1: horas e minutos;
     * @param {{[prop: string]: string}} [props]
     */
    relógio(estilo, props) {
        const rel = Component({ p: { ...props } });

        setInterval(() => {
            const rlg = this.getRlg();

            if (estilo === 1) rlg.pop();

            rel.textContent = rlg.join(':');
        }, 1000);

        return rel;
    },
    /**
     * @param {number} estilo
     * @param {{[prop: string]: string}} [props]
     */
    calendário(estilo, props) {
        const cal = Component({ p: { ...props } });


        setInterval(() => {
            const date = new Date();
            const estilos = [
                `${this.getCal.diaSem[date.getDay()]} ${date.getDate()} ${this.getCal.mês[date.getMonth()]} ${date.getFullYear()}`,
                `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            ];

            cal.textContent = estilos[estilo];

        }, 1000);

        return cal;
    },
    /**
     * @param {{[prop: string]: string}} [props]
     */
    saudação(props) {
        const sdc = Component({ p: { ...props } });

        setInterval(() => {
            const hora = new Date().getHours();

            sdc.textContent = (hora <= 12) ? 'Bom dia!' : (hora >= 18) ? 'Boa noite!' : 'Boa tarde!';
        }, 1000);

        return sdc;
    },
    /**
     * @param {number[]} startEnd
     * @param {number} vel
     */
    contador([start, end], vel) {
        const res = Component('p'),
            count = setInterval(() => (start <= end) ? res.textContent = String(start++) : clearInterval(count), vel);

        return res;
    }
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const selek = (/** @type {string[]} */ ...elems) =>
    (elems.length === 1)
        ? document.querySelector(elems[0])
        : elems.map(elem => document.querySelector(elem))

/**
 * @param {string} id 
 * @param {string} ev 
 * @param {EventListener} fn 
 */
export const selekFn = (id, ev, fn) => document.querySelector(id)?.addEventListener(ev, fn)

/**
 * @param {string} classe 
 */
export const seleKlass = classe => [...document.getElementsByClassName(classe)];
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const templatr = (/** @type {Node[]} */ ...childs) => document.querySelector('body')?.append(...childs);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string[]} lista 
 * @param {{[prop: string]: string}} [props] 
 * @param {{[prop: string]: string}} [propsChilds]
 */
export const DropDown = (lista, props, propsChilds) => {
    const drop = Component({
        select: {
            ...props
        }
    }, lista.map(textContent =>
        Component({ option: { textContent, ...propsChilds } })
    ));

    drop.classList.add('drop');

    return drop;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[local: string]: string | number | {[pesq: string]: string | number}}} args 
 */
export const replacer = args =>
    Object.entries(args).forEach(([local, res]) => {
        const $local = document.querySelector(local);

        (typeof res === 'string' || typeof res === 'number')
            ? $local.textContent = String(res)
            : Object.entries(res).forEach(([search, textContent]) =>
                $local.textContent = $local.textContent.replace(search, String(textContent))
            );
    });
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string[]} lista 
 * @param {{[prop: string]: string}} [props]
 * @param {{[prop: string]: string}} [propsChilds]
 */
export const Lista = (lista, props, propsChilds) =>
    Component({
        ul: {
            ...props
        }
    }, lista.map(item =>
        Component({ li: { ...propsChilds } }, item)
    ));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const Tabela = (/** @type {{}[]}*/ data,/** @type {{[prop: string]: string }} */ props) => {
    const Thead = Component('thead', Object.keys(...data).map(item => Component('th', item)));

    const items = Object.values(data).map((item) =>
        Component('tr', Object.values(item).map(text => Component('td', text)))
    );

    return Component({
        table: {
            ...props
        }
    }, [
        Thead,
        Component('tbody', items)
    ]);
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[tag: string]: {[prop: string]: string}} | string} tag
 * @param {HTMLElement | HTMLElement[] | string} [conteúdo]
 */
export const render = (tag, conteúdo) => Component(tag, conteúdo);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[prop: string]: string}[]} props
 */
export const SearchBox = (...props) => {
    const searchBox = Component({ 'section': { ...props[2] } });
    searchBox.classList.add('searchBox');

    ['input', 'button'].forEach((el, i) => {
        const child = Component({ [el]: props[i] });

        searchBox.appendChild(child);
    });

    return searchBox;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} url 
 * @param {function} fn 
 */
export const AJAX = async (url, fn) => {
    const api = await fetch(url);
    const res = await api.json();

    return fn(res);
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const insertChilds = (/** @type {string} */ local, /** @type {HTMLElement[] | HTMLElement} */ childs) => {
    const $local = document.querySelector(local);

    Array.isArray(childs) ? childs.forEach(child => $local.append(child)) : $local.append(childs);
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} href 
 * @param {string} textContent
 * @param {{[prop: string]: string}} [props]
 */
export const Link = (href, textContent, props) => {
    const link = Component({ a: { ...props, href, textContent } });
    link.classList.add('link');

    return link;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[item: string]: any}} obj 
 * @param {(value: [string, any], index: number, array: [string, any][]) => any} callBack 
 */
export const mapEntries = (obj, callBack) => Object.entries(obj).map(callBack);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[item: string]: any}} obj 
 * @param {(value: string, index: number, array: string[]) => any} callBack
 */
export const mapKeys = (obj, callBack) => Object.keys(obj).map(callBack);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[item: string]: any} | *[]} obj 
 * @param {(value: [string, any], index: number, array: [string, any][]) => any} callBack 
 */
export const mapValues = (obj, callBack) => Object.values(obj).map(callBack);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const getEntries = (/** @type {{ [s: string]: any; } | ArrayLike<any>} */ obj) => Object.entries(obj);

export const getKeys = (/** @type {{}} */ obj) => Object.keys(obj);

export const getValues = (/** @type {{ [s: string]: any; } | ArrayLike<any>} */ obj) => Object.values(obj);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} url 
 * @param {{} | *[]} body 
 */
export const httpPost = (url, body) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
}); /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[href: string]: string}} links 
 * @param {{[prop: string]: string}} [propsNav]
 * @param {{[prop: string]: string}} [propsChilds]
 */
export const LinkBar = (links, /** @type {{ [prop: string]: string; }} */ propsNav, /** @type {{ [prop: string]: string; }} */ propsChilds) => {
    const linkBarr = Component({ nav: { ...propsNav } });

    const $links = Object.entries(links).map(([href, textContent]) => {
        const link = Component({
            a: {
                ...propsChilds,
                href, textContent
            }
        });

        link.classList.add('link');

        return link;
    });

    linkBarr.classList.add('linkBar');
    linkBarr.append(...$links);

    return linkBarr;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {number} size - 1 - 6
 * @param {string} textContent
 * @param {{[prop: string]: string}} [props]
 */
export const Title = (size, textContent, props) => Component({ [`h${size}`]: { ...props, textContent } });
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} src 
 * @param {string} alt 
 * @param {{[prop: string]: string | number}} [props]
 */
export const Img = (src, alt, props) => Component({ img: { ...props, src, alt } });
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[elem: string]: string}} elems
 * @returns {boolean}
 */
export const toggle = elems => {
    let force;

    Object.entries(elems).forEach(([el, toggle]) =>
        force = document.querySelector(el).classList.toggle(toggle)
    );

    return force;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[prop: string]: string}} [props]
 * @param {{[prop: string]: string}} [propsChilds]
 */
export const Burger = (props, propsChilds) => {
    const burger = Component({ div: { ...props, style: 'display: grid; gap: 2px;' } });

    Array.from({ length: 3 }, () => {
        const btn = Component({ button: { ...propsChilds } });
        btn.classList.add('btn_burger');

        return btn;
    }).forEach(child => burger.appendChild(child));

    burger.classList.add('burger');

    return burger;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * Retorna um item aleatório de um array ou string
 */
export const getRandomItem = (/** @type {string | any[]} */ arr) => arr[Math.floor(Math.random() * arr.length)];
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const addClass = (/** @type {{[el: string]: string[]}} */ el) =>
    Object.entries(el).forEach(([tag, classes]) => {
        document.querySelectorAll(tag).forEach(item => item.classList.add(...classes));
    });
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} str 
 * @param {string | RegExp} start 
 * @param {string} [end] 
 */
export const getSubstring = (str, start, end) =>
    (typeof start === 'string')
        ? end
            ? str.substring(str.indexOf(start), str.indexOf(end))
            : str.substring(str.indexOf(start))
        : str.match(start)[0];
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} texto 
 * @param {{ [prop: string]: string; }} [props]
 */
export const Span = (texto, props) => Component({ span: { ...props } }, texto);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[hash: string]: HTMLElement}} routes 
 * @param {{ [prop: string]: string; }} [props]
 * @param {function} [fn]
 */
export const Router = (routes, props, fn) => {
    const router = Component({ div: { ...props } });

    router.classList.add('router');

    const setContent = () => {
        router.innerHTML = '';
        router.append(routes[location.hash]);
    }

    setContent();

    window.addEventListener('hashchange', () => {
        setContent();

        if (fn) fn(location.hash);
    });

    return router;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {any[]} arr 
 * @param {number} columns - quantidade de colunas da matriz
 */
export const paginatr = (arr, columns) => {
    let ctrl = Math.ceil(arr.length / columns);

    const pages = [];

    while (columns) pages[--columns] = arr.splice(columns * ctrl);

    return pages.filter(item => item.length > 0);
}

console.log(`Lib 7 v${versão} - Matsa \u00A9 2020 - ${new Date().getFullYear()}\nCriada por Josias Fontes Alves`);