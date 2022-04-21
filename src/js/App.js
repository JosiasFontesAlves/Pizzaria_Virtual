import { AJAX, SPA } from './lib7.js';
import routes from './routes.js';
import setCarrinho from './setCarrinho.js';

export default () => {
    location.hash = '#pedido';

    AJAX('api.json', api => {
        SPA(routes(api), '#root');

        setCarrinho(api);
    });
}