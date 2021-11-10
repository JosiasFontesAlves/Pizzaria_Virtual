import { render } from "../lib7.js";

export default (id, classe, content) => render({ button: { id: id, class: classe } }, content);