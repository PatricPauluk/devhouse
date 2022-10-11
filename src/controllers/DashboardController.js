import House from '../models/House';

// Exibe as casas cadastradas de apenas um usuário
class DashboardController{

    async show(req, res){
        
        const { user_id } = req.headers;

        // Busca a casa correspondente ao ID do usuário fornecido no header
        const houses = await House.find({ user: user_id });

        return res.json(houses);

    }

}

export default new DashboardController();