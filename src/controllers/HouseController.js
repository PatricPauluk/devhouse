import House from '../models/House';
import User from '../models/User';

class HouseController{

    /* Listar casas disponíves
    Para listar as casas disponíveis, o filtro é enviado no query porams do Insomnia
    */
    async index(req, res){
        // Captura o status enviado pelo query params
        const { status } = req.query;

        /* Busca todas as casas com o status informado
        Mais uma vez, status poderia ser escrito como status:status
        */
        const houses = await House.find({ status });

        // Retorna as casas do filtro
        return res.json(houses);
    }

    // Cadastrar casas
    async store(req, res){

        /*  Primeiro envio teste. console.log(req.body);
        {
            description: 'Photo by Pixasquare on Unsplash',     
            price: '1200',
            location: 'https://unsplash.com/photos/4ojhpgKpS68',
            status: 'true'
        }
        

            Primeiro envio teste. console.log(req.file);
        {
            fieldname: 'thumbnail',
            originalname: 'first-house-test.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'C:\\Users\\patri\\My GitHub\\devhouse\\uploads',
            filename: 'first-house-test-1664896262267.jpg',
            path: 'C:\\Users\\patri\\My GitHub\\devhouse\\uploads\\first-house-test-1664896262267.jpg',
            size: 1450115
        }

        Temos acesso aos dados do arquivo, pois as configurações de uploads são passadas por parâmetro em routes.js

        */
        
        // Captura de dados enviados pelo Insomnia (Multipart)
        const { filename } = req.file; // Thumbnail
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        /* Cadastro no banco

        Exceto user e thumbnail, os outros dados não precisam ser informados como
        por exemplo:
        description: description

        Pois é o mesmo nome informado no model, então se tornaria redundante.
        */
        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.json(house)
    }

    // Atualizar casas
    async update(req, res) {

        // Captura os dados informados
        const { filename } = req.file; // Thumbnail
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        // Captura o id do usuário logado e da casa a ser alterada
        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        // Verifica se o usuário logado tem permissão para alterar a casa (se foi ele quem cadastrou)
        if (String(user._id) !== String(houses.user)){
            return res.status(401).json({ error: 'Não autorizado.' });
        }

        // Busca o id da casa a ser atualizada, e atualiza em seguida
        await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        // return res.json(houses);
        return res.send();
    }

    // Excluir casas
    async destroy(req, res) {

        // Captura o ID da casa e do Usuário
        const { house_id } = req.body;
        const { user_id } = req.headers;

        // Captura o id do usuário logado e da casa a ser alterada
        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        // Verifica se o usuário logado tem permissão para excluir a casa (se foi ele quem cadastrou)
        if (String(user._id) !== String(houses.user)){
            return res.status(401).json({ error: 'Não autorizado.' });
        }

        await House.findByIdAndDelete({ _id: house_id });

        return res.json({ message: 'Excluída com sucesso!' })
    }

}

export default new HouseController();