const { Router } = require('express'); // requisita APENAS A PARTE DE ROTEAMENTO do express

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

// exporta as rotas criadas para serem acessadas
module.exports = routes;