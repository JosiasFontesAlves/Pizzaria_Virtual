import { render } from "../lib7.js";

export default (classe, content) => render({ button: { class: classe } }, content);