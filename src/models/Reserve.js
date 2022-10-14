import { Schema, model } from "mongoose";

// Reserva de casas

const ReserveSchema = new Schema({
    date: String, // data da reserva
    user: {
        // busca o ID do usuário que vai reservar
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    house: {
        // busca o ID da casa que será reservada
        type: Schema.Types.ObjectId,
        ref: "House",
    },
});

export default model("Reserve", ReserveSchema);
