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

let versão = '5.0.5';

/**
 * @param {{[tag: string]: {[prop: string]: string | number}} | string} tag 
 * @param {string | Node | Node[]} [childs]
 */
export const render = (tag, childs) => {
    const $elem = document.createElement(typeof tag === 'string' ? tag : Object.keys(tag)[0]);

    if (typeof tag === 'object')
        Object.entries(...Object.values(tag)).forEach(([prop, val]) => $elem[prop] = val);

    if (childs)
        Array.isArray(childs) ? childs.forEach(item => $elem.append(item)) : $elem.append(childs);

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
        const btn7 = render({
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
        [borda, botão] = ['div', 'button'].map(elem =>
            render({
                [elem]: {
                    style: btn[elem][estilo]
                }
            })
        );

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

export const Tempus = (() => {
    const Elem = (props, fn) => {
        const elem = render({ p: { ...props } });

        setInterval(() => elem.textContent = fn(), 1000);

        return elem;
    }

    return {
        /**
         * @param {number} style 0 - 1
         * @param {{[prop: string]: string}} [props]
         */
        clock: (style, props) =>
            Elem(props, () => {
                const rlg = new Date().toLocaleTimeString();

                return style == 1 ? rlg.match(/(\d+:\d+)/)[0] : rlg;
            }),
        /**
         * @param {number} style 0 - 2
         * @param {{[prop: string]: string}} [props]
         */
        calendar: (style, props) => {
            const getCal = {
                day: {
                    Sun: 'DOM', Mon: 'SEG', Tue: 'TER', Wed: 'QUA',
                    Thu: 'QUI', Fri: 'SEX', Sat: 'SÁB'
                },
                month: {
                    Jan: 'JAN', Feb: 'FEV', Mar: 'MAR', Apr: 'ABR',
                    May: 'MAI', Jun: 'JUN', Jul: 'JUL', Aug: 'AGO',
                    Sep: 'SET', Oct: 'OUT', Nov: 'NOV', Dec: 'DEZ'
                }
            };

            return Elem(props, () => {
                const [weekDay, month, day, year] = String(new Date()).match(/\w+/g);

                const styles = [
                    `${getCal.day[weekDay]} ${day} ${getCal.month[month]} ${year}`,
                    `${day}/${getCal.month[month]}/${year}`,
                    new Date().toLocaleDateString()
                ];

                return styles[style];
            }, 1000);
        },
        /**
         * @param {number} start
         * @param {number} end
         * @param {number} vel
         * @param {{[prop: string]: string}} [props]
         */
        timer: ({ start, end }, vel = 1000, props) => {
            const Timer = render({ p: { ...props } });

            const setTimer = setInterval(() => {
                end
                    ? start < end ? start++ : clearInterval(setTimer)
                    : start > 0 ? start-- : clearInterval(setTimer);

                Timer.textContent = String(start);
            }, vel);

            return Timer;
        }
    }
})(); /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const selek = (/** @type {string[]} */ ...elems) =>
    (elems.length === 1)
        ? document.querySelector(elems[0])
        : elems.map(elem => document.querySelector(elem));

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
    const drop = render({
        select: {
            ...props
        }
    }, lista.map(textContent =>
        render({ option: { textContent, ...propsChilds } })
    ));

    drop.classList.add('drop');

    return drop;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} str
 * @param {string | RegExp} search
 * @param {string | number} replace
 */
export const replacer = (str, search, replace) => str.replace(search, replace);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string[]} lista 
 * @param {{[prop: string]: string}} [props]
 * @param {{[prop: string]: string}} [propsChilds]
 */
export const Lista = (lista, props, propsChilds) =>
    render({
        ul: {
            ...props
        }
    }, lista.map(item =>
        render({ li: { ...propsChilds } }, item)
    ));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const Tabela = (/** @type {{}[]}*/ data,/** @type {{[prop: string]: string }} */ props) => {
    const Thead = render('thead', Object.keys(...data).map(item => render('th', item)));

    const items = Object.values(data).map((item) =>
        render('tr', Object.values(item).map(text => render('td', text)))
    );

    return render({
        table: {
            ...props
        }
    }, [
        Thead,
        render('tbody', items)
    ]);
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[prop: string]: string}[]} props
 */
export const SearchBox = (...props) => {
    const searchBox = render({ 'section': { ...props[2] } });
    searchBox.classList.add('searchBox');

    ['input', 'button'].forEach((el, i) => {
        const child = render({ [el]: props[i] });

        searchBox.appendChild(child);
    });

    return searchBox;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const AJAX = {
    get: async (/** @type {string} */ url) => {
        const api = await fetch(url);

        return await api.json();
    },
    set: (/** @type {string} */ url, /** @type {{} | *[]} */ body) =>
        fetch(url, {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }),
    update: async (/** @type {string} */ file, /** @type {string} */ url, /** @type {{[key: string]: *}} */ keys) => {
        const api = await AJAX.get(file);

        Object.entries(keys).forEach(([key, val]) => api[key] = val);

        AJAX.set(url, api);
    }
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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
    const link = render({ a: { ...props, href, textContent } });
    link.classList.add('link');

    return link;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[item: string]: any}} obj 
 * @param {(value: [string, any], index: number, array: [string, any][]) => any} callBack 
 */
export const mapEntries = (obj, callBack) => Object.entries(obj).map(callBack);

/**
 * @param {{[item: string]: any}} obj 
 * @param {(value: string, index: number, array: string[]) => any} callBack
 */
export const mapKeys = (obj, callBack) => Object.keys(obj).map(callBack);

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
 * @param {{}} obj 
 * @param {(previousValue: {}, currentValue: [string, any], currentIndex: number, array: [string, any][])} callBack 
 * @param {*} initialValue
 */
export const reduceEntries = (obj, callBack, initialValue) => Object.entries(obj).reduce(callBack, initialValue);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[href: string]: string}} links 
 * @param {{[prop: string]: string}} [propsNav]
 * @param {{[prop: string]: string}} [propsChilds]
 */
export const LinkBar = (links, /** @type {{ [prop: string]: string; }} */ propsNav, /** @type {{ [prop: string]: string; }} */ propsChilds) => {
    const linkBarr = render({ nav: { ...propsNav } });

    const $links = Object.entries(links).map(([href, textContent]) => {
        const link = render({
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
export const Title = (size, textContent, props) => render({ [`h${size}`]: { ...props, textContent } });
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} src 
 * @param {string} alt 
 * @param {{[prop: string]: string | number}} [props]
 */
export const Img = (src, alt, props) => render({ img: { ...props, src, alt } });
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
    const burger = render({ div: { ...props, style: 'display: grid; gap: 2px;' } });

    Array.from({ length: 3 }, () => {
        const btn = render({ button: { ...propsChilds } });
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
        : str.match(start);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} texto 
 * @param {{ [prop: string]: string; }} [props]
 */
export const Span = (texto, props) => render({ span: { ...props } }, texto);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[hash: string]: HTMLElement}} routes 
 * @param {{ [prop: string]: string; }} [props]
 * @param {function} [fn]
 */
export const Router = (routes, props, fn) => {
    const router = render({ div: { ...props } });
    router.classList.add('router');

    const setContent = () => {
        const { hash, pathname, search } = location;
        const route = search ? pathname + search : pathname;

        router.innerHTML = '';
        router.append(routes[hash || route] ?? routes['/']);
    }

    setContent();

    window.addEventListener('hashchange', setContent);

    window.addEventListener('click', ev => {
        if (ev.target.localName !== 'a') return;

        const getRoute = ev.target.href.match(/\/[^\/]+$/)[0];

        if (!Object.keys(routes).includes(getRoute)) return;

        ev.preventDefault();

        history.replaceState('', '', ev.target.href);

        setContent();

        if (fn) fn(location, ev);
    });

    return router;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {HTMLElement[]} arr 
 * @param {number} childs - divisão do array
 * @param {string} key - chave do objeto
 * @param {{ [prop: string]: string; }} [props]
 * @param {{ [prop: string]: string; }} [propsLinks]
 */
export const paginatr = (arr, columns, key, props, propsLinks) => {
    const Page = childs => render({ section: { ...props } }, childs),
        Link = (href, textContent) => render({ a: { href, ...propsLinks } }, textContent + 1);

    const pages = [], $arr = [...arr];

    let ctrl = Math.ceil(arr.length / columns);

    while (columns) pages[--columns] = Page($arr.splice(columns * ctrl));

    const routes = pages
        .filter(({ children }) => children.length > 0)
        .reduce((acc, item, i) => ({ ...acc, [`${key + i}`]: item }), {});

    const Links = render({
        nav: {
            className: 'nav_paginatr'
        }
    }, Object.keys(routes).map(Link));

    return [routes, Links];
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{ [prop: string]: string; }} [propsBtn]
 * @param {{ [prop: string]: string; }} [propsCounter] 
 */
export const Counter = (propsBtn, propsCounter) => {
    const Btn = (className, textContent, onclick) => {
        const btn = render({ button: { ...propsBtn, onclick, textContent } });
        btn.classList.add('counter_btn', className);

        return btn;
    }

    const SpanBtn = render({ span: { className: 'span_counter' } }, '0');

    const fn = btn => {
        const setNum = {
            decr: num => num > 0 ? num - 1 : 0,
            incr: num => num + 1
        }

        SpanBtn.textContent = setNum[btn](Number(SpanBtn.textContent));
    }

    return render({
        section: { ...propsCounter }
    }, [
        Btn('decr', '-', () => fn('decr')),
        SpanBtn,
        Btn('incr', '+', () => fn('incr'))
    ]);
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

console.log(`Lib 7 v${versão} - Matsa \u00A9 2020 - ${new Date().getFullYear()}\nCriada por Josias Fontes Alves`);