import { Schema, model } from "mongoose";

// campos da tabela usuário
const UserSchema = new Schema({
    email: String,
});

// parâmetros: nome do model, schema
export default model("User", UserSchema);
