import { Router } from "express"; // requisita APENAS A PARTE DE ROTEAMENTO do express
import multer from "multer";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import DashboardController from "./controllers/DashboardController";
import ReserveController from "./controllers/ReserveController";
import uploadConfig from "./config/upload";

const routes = new Router();
const upload = multer(uploadConfig); // multer recebe as configurações de upload

/*  Algumas informações sobre as rotas

Rota antiga para teste da aplicação, as rotas corretas são importadas do controller.
routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

----------------------------------------------------------------------------------------------

import multer from 'multer';
import uploadConfig from './config/upload';

Estas importações simultaneamentes são para o tratamento de envio de imagens da casa.
Multer é a biblioteca para trabalhar com arquivos, e uploadConfig é o arquivo que criamos
com as configurações de upload.

*/

/* Rotas importadas do controller

Nas rotas de '/houses', é passado as configurações de upload de imagem por parâmetro.
Como é enviado apenas UMA imagem, é escrito como 'upload.single()'.
Caso fossem enviados mais de uma imagem, seria escrito como 'upload.array()'.

upload.single('thumbnail')
Thumbnail é o nome do campo enviado pelo Insomnia, que também consta no model de House.

*/
routes.post("/sessions", SessionController.store); // Cadastra email
routes.post("/houses", upload.single("thumbnail"), HouseController.store); // Cadastra casa
routes.get("/houses", HouseController.index); // Busca/exibe casas
routes.put(
    "/houses/:house_id",
    upload.single("thumbnail"),
    HouseController.update
); // Atualiza casa
routes.delete("/houses", HouseController.destroy); // Exclui casa
routes.get("/dashboard", DashboardController.show); // Exibe todas as casas cadastradas de um usuário
routes.post("/houses/:house_id/reserve", ReserveController.store); // Reservar casa para usuário
routes.get("/reserves", ReserveController.index); // Listagem de reservas
routes.delete("/reserves/cancel", ReserveController.destroy); // Cancelamento de reservas

// exporta as rotas criadas para serem acessadas
// module.exports = routes; // metodo antigo
export default routes;
