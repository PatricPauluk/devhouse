/* Controller para Login/Logout

-------------------------------------------------------------
|                 Métodos de um Controller                  |
-------------------------------------------------------------
| Index     |   Listagem de Sessões                         |
| Store     |   Criar uma sessão                            |
| Show      |   Quando queremos listar uma única sessão     |
| Update    |   Quando queremos alterar alguma sessão       |
| Destroy   |   Quando queremos deletar uma sessão          |
-------------------------------------------------------------

*/

// Importa modelo de Usuários para trabalhar no controller
import User from "../models/User";

class SessionController{

    /* Notas importantes do store
    
    Como em model Users o email informado tem o nome de "email", e o que foi enviado na API também
    se chama "email", o código abaixo não é necessário: 
    const email = req.body.email;

    Se tornando menos redundante e mais legivel, o indicado e utilizado é:
    const { email } = req.body; 

    -------------------------------------------------------------

    O mesmo vale para a criação do email, se os campos fossem diferentes:
    let user = User.create({ email: email })

    Utilizado:
    let user = User.create({ email })

    -------------------------------------------------------------

    Explicando códigos com await. Exemplo:
    let user = await User.findOne({ email });

    O "await" é necessário, pois o envio para o banco pode demorar.
    Assim, ele aguarda o processamento ser realizado completamente.
    
    Como o await é um procedimento assíncrono, é necessário inserir
    "async" no início do store:
    async store(req, res){ // codigo }


    */
    async store(req, res){
        
        // Captura o email informado no body
        const { email } = req.body; 
        
        // Busca (verifica) no banco se já existe um email igual ao informado
        let user = await User.findOne({ email });

        // Se NÃO HOUVER um email igual ao informado, é criado no banco
        if(!user){
            user = await User.create({ email });
        }
        
        /* Retorna p/ o usuário o email informado ou buscado

        Enviando dados (email exemplo) do Insomnia para o banco de dados:
        ---------------------------------------------------------------------------------
        |   Enviados                        |   Retornados                              |
        ---------------------------------------------------------------------------------
        |   {                               |   {                                       |
        |       "email": "demo@demo.com"    |       "email": "demo@demo.com",           |
        |   }                               |       "_id": "633aff3101af82673abc3941",  |
        |                                   |       "__v": 0                            |
        |                                   |   }                                       |
        ---------------------------------------------------------------------------------

        Legenda do retorno:
        -----------------------------------------------------------------------------
        | _id   | O id da tabela (campo identificador único criado automáticamente) |
        | email | O email informado                                                 |
        | __v   | Registrado quantidade de vezes que o registro foi atualizado      |
        -----------------------------------------------------------------------------
        
        Caso o email já tenha sido criado no banco anteriormente, ao realizar o post,
        o "_id" permanece o mesmo nos dados retornados.

        */
        return res.json(user);

    }

}

export default new SessionController();