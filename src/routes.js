import { Router } from 'express'; // requisita APENAS A PARTE DE ROTEAMENTO do express
import SessionController from './controllers/SessionController';

const routes = new Router();

/* Rota antiga para teste da aplicação, as rotas corretas são importadas do controller.
routes.get('/', (req, res) => {
    return res.json({ ok: true });
});
*/

// Rota importada do controller, importanto o método store
routes.post('/sessions', SessionController.store);

// exporta as rotas criadas para serem acessadas
// module.exports = routes; // metodo antigo
export default routes;