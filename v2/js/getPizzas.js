import pizzas from "../../js/pizzas.js";

export default fn => Object.entries(pizzas).map(fn);