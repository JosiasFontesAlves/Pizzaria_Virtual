//@ts-check
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

let versão = '4.4.3';

/**
 * @param {{[tag: string]: {[prop: string]: string | number}} | string} elem
 * @param {HTMLElement | HTMLElement[] | string} [content]
 */
const Component = (elem, content) => {
    const $elem = document.createElement(typeof elem === 'string' ? elem : Object.keys(elem)[0]);

    if (typeof elem === 'object')
        for (let el in elem) Object.entries(elem[el]).forEach(([atr, val]) => $elem.setAttribute(atr, String(val)));

    if (content)
        Array.isArray(content) ? content.map(item => $elem.append(item)) : $elem.append(content);

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

    botão.id = idBtn;
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
        diaSem: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
        mês: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
    },
    getRlg: () => {
        const date = new Date();

        return [
            date.getHours(), date.getMinutes(), date.getSeconds()
        ].map(num => num < 10 ? `0${num}` : num);
    },
    /**
     * @param {string} id 
     * @param {number} estilo - 0: relógio completo; 1: horas e minutos;
     * @param {{[prop: string]: string}} [props]
     */
    relógio(id, estilo, props) {
        const rel = Component({ p: { ...props } });
        rel.id = id;

        setInterval(() => {
            const rlg = this.getRlg();

            if (estilo === 1) rlg.pop();

            rel.textContent = rlg.join(':');
        }, 1000);

        return rel;
    },
    /**
     * @param {string} id 
     * @param {number} [estilo]
     * @param {{[prop: string]: string}} [props]
     */
    calendário(id, estilo, props) {
        const cal = Component({ p: { ...props } });
        cal.id = id;

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
     * @param {string} id 
     * @param {{[prop: string]: string}} [props]
     */
    saudação(id, props) {
        const sdc = Component({ p: { ...props } });

        setInterval(() => {
            const hora = new Date().getHours();

            sdc.id = id ?? 'tempus-sdc';
            sdc.textContent = (hora <= 12) ? "Bom dia!" : (hora >= 18) ? "Boa noite!" : "Boa tarde!";
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
export const selekFn = (id, ev, fn) => document.querySelector(id).addEventListener(ev, fn)

/**
 * @param {string} classe 
 */
export const seleKlass = classe => [...document.getElementsByClassName(classe)];
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} btn - Botão que será responsável pelo evento
 * @param {string[]} elems - Elementos que serão alterados pelo toggle
 * @param {string} toggle - Classe CSS que será responsável pelo tema escuro
 * @param {function} [fn] - Callback opcional
 */
export const temEsc = (btn, elems, toggle, fn) => document.getElementById(btn).addEventListener('click', ev => {
    elems.map(elem => document.querySelector(elem).classList.toggle(toggle));

    if (fn) fn(ev);
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const templatr = (/** @type {HTMLElement[]} */ elems) => elems.forEach(tag => document.body.appendChild(tag));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const Animatus = {
    /**
     * @param {string} id 
     * @param {{background: string, border: string, height: number, width: number }} props
     * @param {number} vel
     */
    barr(id, { background, border, height, width }, vel) {
        const $render = () => Component('div');
        const barr = $render(), innerBarr = $render();

        let px = 0;

        barr.style.border = border;
        barr.id = id;

        Object.entries({
            background,
            float: 'left',
            height: 'inherit'
        }).forEach(([prop, val]) => innerBarr.style[prop] = val);

        const { style } = innerBarr;

        Object.entries({ height, width }).forEach(([prop, val]) => barr.style[prop] = `${val}px`);

        const count = setInterval(() => (style.width != `${width}px`) ? style.width = `${px++}px` : clearInterval(count), vel);

        barr.appendChild(innerBarr);

        return barr;
    },
    /**
     * @param {string} id 
     * @param {number} z 
     * @param {number} vel 
     */
    girar(id, z, vel) {
        let ang = 0;
        const { style } = document.getElementById(id);
        const count = setInterval(() => (ang <= z) ? style.transform = `rotateZ(${ang++}deg)` : clearInterval(count), vel);
    }
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const DropDown = (/** @type {string} */ id, /** @type {any[]} */ lista) => {
    const drop = Component('select');
    drop.id = id;
    drop.classList.add('drop');

    lista.forEach(item => {
        const option = Component('option');
        option.textContent = item;

        drop.appendChild(option);
    });

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
 * @param {string} id 
 * @param {string[]} lista 
 * @param {{[prop: string]: string}} [props]
 */
export const Lista = (id, lista, props) => {
    const $lista = Component('ul');
    $lista.id = id;

    lista.forEach((item, i) => {
        const li = Component('li');
        li.id = `${id}-${i}`;
        li.append(item);

        if (props) Object.entries(props).forEach(([prop, val]) => li.setAttribute(prop, val));

        $lista.appendChild(li);
    });

    return $lista;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const Tabela = (/** @type {string} */ id, /** @type {{}[]} */ tabela) => {
    const [table, thead, tbody] = ['table', 'thead', 'tbody'].map(el => Component(el));

    const Tr = (/** @type {*} */ data) => Component('tr', data);
    const keys = tabela.map(key => Object.keys(key));

    table.id = id;

    thead.appendChild(Tr(keys[0].map(th => Component('th', th))));

    const Body = tabela.flatMap(tab => [
        Object.values(tab).map(dado => {
            const Td = Component('td');
            Td.append(dado);

            return Td;
        })
    ].map(row => Tr(row)));

    tbody.append(...Body)

    table.append(thead, tbody);

    return table;
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

    ['input', 'button'].map((el, i) => {
        const child = Component({ [el]: props[i] });

        searchBox.appendChild(child);
    });

    searchBox.children[1].textContent = props[1].value ?? '=>';

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

/**
 * @param {{[hash: string]: HTMLElement}} pages
 * @param {string} parent - componente que será atualizado
 * @param {(hash: string) => void} [fn] - CallBack opcional
 */
export const SPA = (pages, parent, fn) => {
    const $parent = document.querySelector(parent);

    const setParent = () => {
        $parent.innerHTML = '';
        $parent.appendChild(pages[location.hash]);
    }

    setParent();

    window.addEventListener('hashchange', () => {
        setParent();

        if (fn) fn(location.hash);
    });
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const insertChilds = (/** @type {string} */ local, /** @type {HTMLElement[] | HTMLElement} */ childs) => {
    const $local = document.querySelector(local);

    Array.isArray(childs) ? childs.forEach(child => $local.appendChild(child)) : $local.appendChild(childs);
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} href 
 * @param {string} textContent
 * @param {{[prop: string]: string}} [props]
 */
export const Link = (href, textContent, props) => {
    const link = document.createElement('a');
    link.textContent = textContent;
    link.href = href;

    if (props && typeof props === 'object')
        Object.entries(props).forEach(([prop, val]) => link.setAttribute(prop, val));

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
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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

    const $links = Object.entries(links).map(([href, txt]) => {
        const link = document.createElement('a');

        if (propsChilds) {
            for (let prop in propsChilds) link.setAttribute(prop, propsChilds[prop]);
        }

        link.href = href;
        link.textContent = txt;
        link.classList.add('link');

        return link;
    });

    linkBarr.classList.add('linkBar');
    linkBarr.append(...$links);

    return linkBarr;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} title 
 * @param {{[prop: string]: string}} [props]
 */
export const Title = (title, props) => {
    const h1 = Component({ h1: { ...props } });
    h1.textContent = title;

    return h1;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} src 
 * @param {string} alt 
 * @param {{[prop: string]: string | number}} [props]
 */
export const Img = (src, alt, props) => {
    const img = Component({ img: { ...props } });

    Object.entries({ src, alt }).forEach(([prop, val]) => img.setAttribute(prop, val));

    return img;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[elem: string]: string}} elems 
 * @param {boolean} [force] 
 */
export const toggle = (elems, force) => {
    Object.entries(elems).forEach(([el, toggle]) => {
        force = document.querySelector(el).classList.toggle(toggle, force)
    });

    return force;
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{[prop: string]: string}} [props]
 */
export const Burger = props => {
    const burger = Component({ div: { ...props } });
    burger.style.display = 'grid';
    burger.style.gap = '2px';

    for (let i = 0; i < 3; i++) {
        const btn = Component('button');
        btn.classList.add('btn_burger');

        burger.appendChild(btn);
    }

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
 * @param {string} src 
 * @param {{ [prop: string]: string | number }} props
 */
export const Video = (src, props) => {
    const video = document.createElement('video');
    video.src = src;

    if (props && typeof props === 'object') {
        Object.entries(props).forEach(([prop, val]) => video.setAttribute(prop, String(val)));
    }

    return video;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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
 * Adiciona um id numérico a uma classe CSS
 * @param {string} classe 
 * @param {string} id 
 */
export const addId = (classe, id) => [...document.getElementsByClassName(classe)].forEach((elem, i) => elem.id = `${id}-${i}`);

console.log(`Lib 7 v${versão} - Matsa \u00A9 2020 - ${new Date().getFullYear()}\nCriada por Josias Fontes Alves`);