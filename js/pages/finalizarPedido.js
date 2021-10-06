import { Card } from "../components.js";

export default () => {
    const getCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    for (let pizza in getCarrinho) {
        console.log(pizza);

    }

    //Card('carrinho', [
//
    //]);
}