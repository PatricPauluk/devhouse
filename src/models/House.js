import { Schema, model } from 'mongoose';

// Os dados foram enviados por Multipart no Insomnia
const HouseSchema = new Schema({
    thumbnail: String, // a string é o caminho da imagem
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    /* Registro do usuário que criou a casa no sistema
    Para inserir o user no Insomnia, foi utilizado o header,
    já que o usuário estaria logado para adicionar a casa,
    então o front-end já teria armazenado o seu ID.
    */
    user:{ 
        type: Schema.Types.ObjectId, // referencia o id do usuário
        ref: 'User' // referencia ao user
    }
});



export default model('House', HouseSchema);