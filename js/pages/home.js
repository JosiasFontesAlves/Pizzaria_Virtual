import { insertChilds, render } from "../lib7.js";
import template from "../template.js";
import ContainerPizzas from "../components/ContainerPizzas.js";

export default () => {
    location.hash = '#home';

    const { cardLink } = template;

    Object.entries({
        '#container-pizzas': ContainerPizzas,
        '#card-link': cardLink.map(([tag, txt]) => render(tag, txt))
    }).map(([tag, childs]) => insertChilds(tag, childs));
}