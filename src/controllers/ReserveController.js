import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController{

    async store(req, res){
        const { user_id } = req.headers; // Captura o ID do usuário no header
        const { house_id } = req.params; // Captura o ID da casa nos parâmetros da URL
        const { date } = req.body; // Captura a data escrita no body (JSON)

        // Busca a casa no banco de dados
        const house = await House.findById(house_id);
        // Busca o usuário atualmente logado
        const user = await User.findById(user_id);

        // Se a casa não existir...
        if(!house){
            return res.status(400).json({ error: 'Essa casa não existe.' });
        }
        // Se o status da casa for negativo...
        if(house.status !== true){
            return res.status(400).json({ error: 'Solicitação indisponível.' });
        }

        // Verifica se o ID do usuário é o mesmo do dono da casa
        if(String(user_id) === String(house.user)){
            return res.status(401).json({ error: 'Reserva não permitida.' });
        }

        // Cria a reserva
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        await reserve.populate('house');
        await reserve.populate('user');

        return res.json(reserve);
    }

}

export default new ReserveController();

/* Algumas observações sobre a reserva

A primeira reserva da casa retornou:
{
    "date": "25 de novembro",
    "user": "633aff3101af82673abc3941",
    "house": "63457f917fde6ad77416bede",
    "_id": "634590b575269ef41ce2aa18",
    "__v": 0
}

Ela foi um sucesso, porém as informações são muito limitadas para retornar ao front-end,
por isso inserimos o código com "populate()", pois o retorno fica mais completo:
{
    "date": "25 de novembro",
    "user": {
        "_id": "633aff3101af82673abc3941",
        "email": "demo@demo.com",
        "__v": 0
    },
    "house": {
        "_id": "63457f917fde6ad77416bede",
        "thumbnail": "luke-stackpoole-eWqOgJ-lfiI-unsplash-1665499025865.jpg",
        "description": "Photo by Johnson Johnson on Unsplash (Altered)",
        "price": 4213,
        "location": "Westfjords Region, Iceland",
        "status": true,
        "user": "633b0e17561dafabb24af426",
        "__v": 0,
        "thumbnail_url": "http://localhost:3333/files/luke-stackpoole-eWqOgJ-lfiI-unsplash-1665499025865.jpg",
        "id": "63457f917fde6ad77416bede"
    },
    "_id": "6345956b31227e4359061260",
    "__v": 0
}

Basicamente os dados foram unidos para a reserva.

OBS: Tive problemas inserindo o código como no curso: await reserve.execPopulate();
O código foi removido.
*/