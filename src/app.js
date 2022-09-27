import express from 'express';
import routes from './routes'; // requisita o arquivo routes.js (não é uma dependência!)

/* Notas da configuração da execução do servidor

-----------------------------------------------------------------------------------------
| yarn add sucrase nodemon -D                                                           |
-----------------------------------------------------------------------------------------
| Sucrase | para importar arquivos e dependencias da forma recomendada (sem o require)  |
| Nodemon | para manter o servidor executando                                           |
| -D      | instala como dependência de desenvolvedor                                   |
-----------------------------------------------------------------------------------------

O server não executa como antes (node src/server.js) após as atualizações com Sucrase,
por causa do import. Executa-se com o Sucrase: yarn sucrase-node src/server.js

Para executar com o yarn dev (junto com nodemon):
1. Script no package.json;
2. Criar um arquivo nodemon.json na raiz;
3. No arquivo nodemon.json será buscado e registrado os arquivos .js necessários.
4. O projeto pode ser executado com yarn dev;


Qualquer dúvida, comparar o código com o "crud" criado em my_study, código mais antigo.

*/

class App{
    // quando a classe app for chamada, o método construtor é o primeiro a ser iniciado automáticamente
    constructor(){
        this.server = express(); // o this é necessário para referenciar a classe App

        // middlewares e routes devem ser chamados no constructor para serem iniciados
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json()); // consta que vai usar JSON no express
    }

    routes(){
        this.server.use(routes); // chama as rotas da requisição da 2ª linha
    }

}

// exporta a classe App (selecionando o server)
// module.exports = new App().server; // metodo antigo
export default new App().server;