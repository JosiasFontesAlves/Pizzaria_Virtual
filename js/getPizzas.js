import pizzas from "./pizzas.js";

export default fn => Object.entries(pizzas).map(fn);