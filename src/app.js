import express from 'express';
import mongoose from 'mongoose';
import routes from './routes'; // requisita o arquivo routes.js (não é uma dependência!)


/* ---------------------------- Notas Gerais de Configuração ----------------------------


-----------------------------------------------------------------------------------------
| yarn add sucrase nodemon -D                                                           |
-----------------------------------------------------------------------------------------
| Sucrase | para importar arquivos e dependencias da forma recomendada (sem o require)  |
| Nodemon | para manter o servidor executando                                           |
| -D      | instala como dependência de desenvolvedor                                   |
-----------------------------------------------------------------------------------------


-----------------------------------------------------------------------------------------
| O server não executa como antes (node src/server.js) após as atualizações com Sucrase |
| por causa do import. Executa-se com o Sucrase: yarn sucrase-node src/server.js        |
-----------------------------------------------------------------------------------------
| Para executar com o yarn dev (junto com nodemon):                                     |
| 1. Script no package.json;                                                            |
| 2. Criar um arquivo nodemon.json na raiz;                                             |
| 3. No arquivo nodemon.json será buscado e registrado os arquivos .js necessários;     |
| 4. O projeto pode ser executado com yarn dev.                                         |
-----------------------------------------------------------------------------------------


Utilizando MongoDB: https://www.mongodb.com/atlas/database

1.  No site foi permitido todos os IP's na opção Network Access, criado um usuário na
    opção Database Access, e o cluster/banco devhouse foi criado em Database.

2.  No banco, clica na opção Connect, e depois em Connect your application, salvamos
    esta connection string:
    mongodb+srv://papauluk:<password>@devhouse.hyory8h.mongodb.net/?retryWrites=true&w=majority

3.  Instalada a Biblioteca Mongoose:
    yarn add mongoose

4. Após importar o Mongoose, a conexão ao banco é realizada dentro do método constructor.


------------------------------------ Fim das Notas ------------------------------------ */


class App{
    // quando a classe app for chamada, o método construtor é o primeiro a ser iniciado automáticamente
    constructor(){
        // o this é necessário para referenciar a classe App
        this.server = express(); 
        
        // connection string
        const URI = 'mongodb+srv://papauluk:SYTwbyWg59L05zmx@devhouse.hyory8h.mongodb.net/?retryWrites=true&w=majority';
        
        // conecta ao banco de dados mongodb
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // middlewares e routes devem ser chamados no constructor para serem iniciados
        this.middlewares();
        this.routes();
    }

    middlewares(){
        // consta que vai usar JSON no express
        this.server.use(express.json());
    }

    routes(){
        // chama as rotas da importação
        this.server.use(routes); 
    }

}

// exporta a classe App (selecionando o server)
// module.exports = new App().server; // metodo antigo
export default new App().server;