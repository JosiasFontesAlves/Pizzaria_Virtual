import { selekFn, seleKlass } from "./lib7.js";

export default () => {
    ['btn_menos', 'btn_mais'].map(classe => {
        [...seleKlass(classe)].map(({ id }) => {
            selekFn(id, 'click', ({ path, target: { classList } }) => {
                const toNumber = str => Number(str),
                    fnClasse = {
                        btn_mais: num => toNumber(num) + 1,
                        btn_menos: num => (num > 0) ? toNumber(num) - 1 : 0
                    }

                path[1].children[1].textContent = fnClasse[classList](path[1].children[1].textContent);
            });
        });
    });
}