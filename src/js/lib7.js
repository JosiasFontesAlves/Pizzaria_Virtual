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

let versão = '3.8.7';

/**
 * @param {string} idBtn
 * @param {number} estilo
 * @param {string | string[]} cor
 */
export function Btn(idBtn, estilo, cor) {
    /**
     * @param {number} i
     * @param {string | string[]} bg
     */
    const setCor = (i, bg) => (Array.isArray(cor) ? cor[i] : bg),
        props = [
            `background: ${cor[1]}; border: 2px solid; padding: 2px; height: 20px; width: 50px;`,
            `background: ${setCor(
                0,
                cor
            )}; border: none; height: inherit; width: 20px;`,
            `background: ${setCor(1, '#d8d8d8')};`,
            'border-radius: 25px; height: 20px;',
        ],
        btn = {
            div: [
                `${props[0]} border-radius: 15px;`,
                props[0],
                `${props[0]} border-radius: 7px;`,
                `${props[2]}; height: 15px; border-radius: 10px; display: flex; align-items: center; width: 50px;`,
                `${props[2]}; ${props[3]}; border: 1px solid; width: 50px;`,
                `${props[2]}; border: 2px solid; ${props[3]} padding: 5px; width: 55px;`,
            ],
            button: [
                `${props[1]} border-radius: inherit;`,
                props[1],
                `${props[1]} border-radius: 5px`,
                `background: ${setCor(
                    0,
                    cor
                )}; border: none; border-radius: 50%; height: 25px; width: 25px`,
                `width: 20px; border: 5px solid ${setCor(
                    0,
                    cor
                )}; background: none; border-radius: 50%; height: inherit;`,
                `${props[1]} border-radius: 50%;`,
            ],
        },
        [borda, botão] = ['div', 'button'].map((elem) => {
            const el = document.createElement(elem);
            el.setAttribute('style', btn[elem][estilo]);

            return el;
        });

    botão.id = idBtn;
    borda.style.display = 'flex';

    Object.entries({
        cursor: 'pointer',
        'margin-left': '-1px',
        position: 'fixed',
    }).forEach(([prop, val]) => (botão.style[prop] = val));

    borda.appendChild(botão);

    return borda;
} /* ----- Lib de botões ----- */

export const Tempus = {
    /**
     * @param {string} id
     * @param {number} [estilo]
     */
    relógio(id, estilo) {
        const rel = document.createElement('p');
        rel.id = id;

        setInterval(() => {
            const date = new Date();
            const rlg = [date.getHours(), date.getMinutes(), date.getSeconds()].map(
                (num) => (num < 10 ? `0${num}` : num)
            );

            if (estilo === 1) rlg.pop();

            rel.textContent = rlg.join(':');
        }, 1000);

        return rel;
    },
    /**
     * @param {string} id
     * @param {number} [estilo]
     */
    calendário(id, estilo) {
        const cal = document.createElement('p');
        cal.id = id;

        setInterval(() => {
            const date = new Date();
            const calendário = {
                diaSem: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
                mês: [
                    'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
                    'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
                ],
            },
                estilos = [
                    `${calendário.diaSem[date.getDay()]} ${date.getDate()} ${calendário.mês[date.getMonth()]
                    } ${date.getFullYear()}`,
                    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                ];

            cal.textContent = estilos[estilo];
        }, 1000);

        return cal;
    },
    /**
     * @param {string} id
     */
    saudação(id) {
        const sdc = document.createElement('p'),
            hora = new Date().getHours();

        sdc.id = id ?? 'tempus-sdc';
        sdc.textContent =
            hora <= 12 ? 'Bom dia!' : hora >= 18 ? 'Boa noite!' : 'Boa tarde!';

        return sdc;
    },
    /**
     * @param {number[]} startEnd
     * @param {number} vel
     */
    contador([start, end], vel) {
        const res = document.createElement('p'),
            count = setInterval(() => start <= end ? (res.textContent = String(start++)) : clearInterval(count), vel);

        return res;
    },
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string | string[]} id
 * @returns {HTMLElement | HTMLElement[]}
 */
export const selek = (id) => Array.isArray(id) ? id.map((el) => document.getElementById(el)) : document.getElementById(id);

/**
 * @param {string} elem
 */
export const sElem = (elem) => document.querySelector(elem);

/**
 * @param {string} id
 * @param {string} ev
 * @param {EventListener} fn
 */
export const selekFn = (id, ev, fn) =>
    document.getElementById(id).addEventListener(ev, fn);

/**
 * @param {string} elem
 * @param {string} ev
 * @param {EventListener} fn
 */
export const sElemFn = (elem, ev, fn) =>
    document.querySelector(elem).addEventListener(ev, fn, false);

/**
 * @param {string} classe
 */
export const seleKlass = (classe) => [
    ...document.getElementsByClassName(classe),
];
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} btn - Botão que será responsável pelo evento
 * @param {string[]} elems - Elementos que serão alterados pelo toggle
 * @param {string} toggle - Classe CSS que será responsável pelo tema escuro
 * @param {function} [fn] - Callback opcional
 */
export const temEsc = (btn, elems, toggle, fn) =>
    document.getElementById(btn).addEventListener('click', (ev) => {
        elems.map((elem) => document.querySelector(elem).classList.toggle(toggle));

        if (fn) fn(ev);
    });
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} id - id do menu
 * @param {string} btn - Botão que será responsável pelo evento
 * @param {string} toggle - Classe CSS que será responsável por esconder o menu
 */
export const menuLateral = (id, btn, toggle) =>
    document
        .getElementById(btn)
        .addEventListener('click', () =>
            document.querySelector(id).classList.toggle(toggle)
        );
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {HTMLElement[]} elems
 */
export const templatr = (elems) =>
    elems.forEach((tag) => document.body.appendChild(tag));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{id: string}} tags - { id: texto }
 */
export const texto = (tags) =>
    Object.entries(tags).forEach(
        ([tag, texto]) => (document.getElementById(tag).textContent = texto)
    );
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const Animatus = {
    /**
     * @param {string} id
     * @param {object} props
     * @param {string} props.background
     * @param {string} props.border
     * @param {number} props.height
     * @param {number} props.width
     * @param {number} vel
     */
    barr(id, { background, border, height, width }, vel) {
        const $render = () => document.createElement('div');
        const barr = $render(),
            innerBarr = $render();
        let px = 0;

        barr.style.border = border;
        barr.id = id;

        Object.entries({
            background,
            float: 'left',
            height: 'inherit',
        }).forEach(([prop, val]) => (innerBarr.style[prop] = val));

        const { style } = innerBarr;

        Object.entries({ height, width }).forEach(
            ([prop, val]) => (barr.style[prop] = `${val}px`)
        );

        const count = setInterval(
            () =>
                style.width != `${width}px`
                    ? (style.width = `${px++}px`)
                    : clearInterval(count),
            vel
        );

        barr.appendChild(innerBarr);

        return barr;
    },
    /**
     * @param {string} id
     * @param {number} z
     * @param {number} vel
     */
    girar(id, z, vel) {
        const { style } = document.getElementById(id);
        let ang = 0;
        const count = setInterval(
            () =>
                ang <= z
                    ? (style.transform = `rotateZ(${ang++}deg)`)
                    : clearInterval(count),
            vel
        );
    },
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} id
 * @param {string[]} lista
 */
export function DropDown(id, lista) {
    const drop = document.createElement('select');
    drop.id = id;
    drop.classList.add('drop');

    lista.forEach((item) => {
        const option = document.createElement('option');
        option.textContent = item;

        drop.appendChild(option);
    });

    return drop;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export function replacer() {
    [...arguments].forEach((pesq) => {
        for (let local in pesq) {
            for (let res in pesq[local]) {
                let str = document.querySelector(local);
                str.innerHTML = str.innerHTML.replace(`{{${res}}}`, pesq[local][res]);
            }
        }
    });
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} id
 * @param {string[]} lista
 * @param {{prop: string}} [props]
 */
export const Lista = (id, lista, props) => {
    const $render = (/** @type {string} */ el) => document.createElement(el);

    const $lista = $render('ul');
    $lista.id = id;

    lista.forEach((item, i) => {
        const li = $render('li');
        li.id = `${id}-${i}`;
        li.append(item);

        if (props)
            Object.entries(props).forEach(([prop, val]) =>
                li.setAttribute(prop, val)
            );

        $lista.appendChild(li);
    });

    return $lista;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} id
 * @param {{}[]} tabela
 */
export const Tabela = (id, tabela) => {
    const [table, thead, tbody] = ['table', 'thead', 'tbody'].map((el) =>
        document.createElement(el)
    );
    const $render = (
    /** @type {string} */ tag,
    /** @type {string} */ content
    ) => {
        const el = document.createElement(tag);
        el.append(...content);

        return el;
    };

    const Tr = (/** @type {*} */ data) => $render('tr', data);

    table.id = id;

    const Head = Tr(Object.keys(...tabela).map((th) => $render('th', th)));
    thead.appendChild(Head);

    const Body = tabela.flatMap((tab) =>
        [
            Object.values(tab).map((dado) => {
                const Td = document.createElement('td');
                Td.append(dado);

                return Td;
            }),
        ].map((row) => Tr(row))
    );

    tbody.append(...Body);

    table.append(thead, tbody);

    return table;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param { { tag: { prop: string } } | string} tag
 * @param {HTMLElement | HTMLElement[] | string} [conteúdo]
 */
export function render(tag, conteúdo) {
    const elem = document.createElement(
        typeof tag === 'string' ? tag : Object.keys(tag)[0]
    );

    if (typeof tag === 'object')
        for (let el in tag)
            Object.entries(tag[el]).forEach(([atr, val]) =>
                elem.setAttribute(atr, val)
            );

    if (conteúdo) {
        Array.isArray(conteúdo)
            ? conteúdo.map((item) => elem.append(item))
            : elem.append(conteúdo);
    }

    return elem;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {object} props
 */
export function SearchBox(...props) {
    const searchBox = document.createElement('section');
    searchBox.classList.add('searchBox');

    ['input', 'button'].map((el, i) => {
        const child = document.createElement(el);

        if (Array.isArray(props)) {
            Object.entries(props[i]).map(([atr, val]) =>
                child.setAttribute(atr, val)
            );
        }

        searchBox.appendChild(child);
    });

    searchBox.children[1].textContent = '=>';

    return searchBox;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} idForm
 * @param {{prop: string}[]} [propsChilds]
 */
export function FormBox(idForm, propsChilds) {
    const form = document.createElement('form');
    form.id = idForm;

    const inputs = ['text', 'password'].map((type) => {
        const input = document.createElement('input');
        input.type = type;

        return input;
    });

    form.append(...inputs, document.createElement('button'));

    if (propsChilds && propsChilds.length <= 3) {
        propsChilds.forEach((child, i) => {
            Object.entries(child).forEach(([prop, val]) =>
                form.children[i].setAttribute(prop, val)
            );
        });
    }

    return form;
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} url
 * @param {function} fn
 */
export async function consumirAPI(url, fn) {
    const api = await fetch(url);
    const res = await api.json();

    return fn(res);
} /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{ hash: HTMLElement | function }} pages
 * @param {string} elem - componente que será atualizado
 */
export const SPA = (pages, elem) => {
    const parent = document.querySelector(elem);
    const setParent = () => {
        parent.innerHTML = '';
        parent.appendChild(pages[location.hash]);
    };

    setParent();

    window.addEventListener('hashchange', setParent);
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} local
 * @param {HTMLElement[]} childs
 */
export const insertChilds = (local, childs) => document.querySelector(local).append(...childs);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{ prop: string }} props - props do slider
 * @param {string[]} urlFotos
 */
export const Slider = (props, urlFotos) => {
    const $render = (/** @type {string} */ el) => document.createElement(el),
        setStyle = (el, props) =>
            Object.entries(props).map(([atr, val]) => (el.style[atr] = val)),
        setFtAtual = (/** @type {number} */ ft) => {
            img.src = urlFotos[ft];

            [
                [prev, ftAtual === 0],
                [next, ftAtual >= urlFotos.length - 1],
            ].forEach(([btn, cond]) => (btn.disabled = cond ? true : false));
        };

    const [slider, img] = ['section', 'img'].map((el) => $render(el));

    if (typeof props === 'object')
        Object.entries(props).map(([atr, val]) => slider.setAttribute(atr, val));

    setStyle(slider, { display: 'flex', alignItems: 'center' });

    const [prev, next] = [
        ['prev', '<', 35],
        ['next', '>', -35],
    ].map(([id, txt, pos]) => {
        const btn = $render('button');
        setStyle(btn, { transform: `translateX(${pos}px)`, height: 'fit-content' });

        Object.entries({
            textContent: txt,
            id,
            classList: 'btn_slider',
        }).map(([atr, val]) => (btn[atr] = val));

        return btn;
    });

    let ftAtual = 0;

    setFtAtual(ftAtual);

    slider.append(prev, img, next);

    [
        [prev, -1],
        [next, 1],
    ].map(([btn, fn]) => btn.addEventListener('click', () => setFtAtual((ftAtual += fn))));

    return slider;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} id
 */
export const Cookr = (id) => {
    const data = {};

    return {
        id,
        /**
         * @param {string} [item] - nome da chave a ser pesquisada
         */
        getData: (item) => data[item] || data,
        /**
         * @param {{data: any}} content - chave a ser inserida no objeto
         */
        setData: (content) => Object.entries(content).forEach(([key, val]) => (data[key] = val)),
    };
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} href
 * @param {string} textContent
 * @param {{ prop: string}} [props]
 */
export const Link = (href, textContent, props) => {
    const link = document.createElement('a');
    link.textContent = textContent;
    link.href = href;

    if (props && typeof props === 'object')
        Object.entries(props).forEach(([prop, val]) =>
            link.setAttribute(prop, val)
        );

    return link;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{item: *}} obj
 * @param {function} callBack
 */
export const mapEntries = (obj, callBack) => Object.entries(obj).map(callBack);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{item: *}} obj
 * @param {function} callBack
 */
export const mapKeys = (obj, callBack) => Object.keys(obj).map(callBack);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{item: *}} obj
 * @param {function} callBack
 */
export const mapValues = (obj, callBack) => Object.values(obj).map(callBack);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {object} obj
 */
export const getEntries = obj => Object.entries(obj);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {object} obj
 */
export const getKeys = obj => Object.keys(obj);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {object} obj
 */
export const getValues = obj => Object.values(obj);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} url
 * @param {{} | *[]} body
 */
export const httpPost = (url, body) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {{href: string}} links
 * @param {{prop: string}} [props]
 */
export const LinkBar = (links, props) => {
    const linkBarr = document.createElement('div');

    if (props) for (let prop in props) linkBarr.setAttribute(prop, props[prop]);

    const $links = Object.entries(links).map(([href, txt]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = txt;
        link.classList.add('link');

        return link;
    });

    linkBarr.classList.add('linkBar');
    linkBarr.append(...$links);

    return linkBarr;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} title
 * @param {{prop: string}} [props]
 */
export const Title = (title, props) => {
    const h1 = document.createElement('h1');
    h1.textContent = title;

    if (props) {
        Object.entries(props).forEach(([prop, val]) => h1.setAttribute(prop, val));
    }

    return h1;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} src
 * @param {string} alt
 * @param {prop: string}} props
 * @returns
 */
export const Img = (src, alt, props) => {
    const img = document.createElement('img');
    Object.entries({ src, alt }).forEach(([prop, val]) => img.setAttribute(prop, val));

    if (props) for (let prop in props) img.setAttribute(prop, props[prop]);

    return img;
}; /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * @param {string} el
 * @param {string} toggle
 */
export const toggle = (el, toggle) => document.querySelector(el).classList.toggle(toggle);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

console.log(`Lib 7 v${versão} - Matsa \u00A9 2020 - ${new Date().getFullYear()}\nCriada por Josias Fontes Alves`);