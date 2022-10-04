class HouseController{

    async store(req, res){

        /* Primeiro envio teste. Resultado no console de req.body:
        {
            description: 'Photo by Pixasquare on Unsplash',     
            price: '1200',
            location: 'https://unsplash.com/photos/4ojhpgKpS68',
            status: 'true'
        }
        */
        console.log(req.body);
        
        /* Primeiro envio teste. Resultado no console de req.file:
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
        console.log(req.file);
        
        return res.json({ ok: true })
    }

}

export default new HouseController();