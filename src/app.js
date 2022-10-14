/* eslint-disable max-len */
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import routes from "./routes"; // requisita o arquivo routes.js (não é uma dependência!)

/* -------------------------------- Notas Gerais de Configuração --------------------------------

O objetivo deste software é ser o meu maior suporte de todos para a criação de qualquer
aplicação. Sempre que eu precisar criar uma aplicação esta vai ser a base, então vai ser o
melhor documentado possível.

----------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------
| yarn add sucrase nodemon -D                                                           |
-----------------------------------------------------------------------------------------
| Sucrase | para importar arquivos e dependencias da forma recomendada (sem o require)  |
| Nodemon | para manter o servidor executando                                           |
| -D      | instala como dependência de desenvolvedor                                   |
-----------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------

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

----------------------------------------------------------------------------------------------

Utilizando MongoDB: https://www.mongodb.com/atlas/database

1.  No site foi permitido todos os IP's na opção Network Access, criado um usuário na
    opção Database Access, e o cluster/banco devhouse foi criado em Database.

2.  No banco, clica na opção Connect, e depois em Connect your application, salvamos
    esta connection string:
    mongodb+srv://papauluk:<password>@devhouse.hyory8h.mongodb.net/?retryWrites=true&w=majority

3.  Instalada a Biblioteca Mongoose:
    yarn add mongoose

4. Após importar o Mongoose, a conexão ao banco é realizada dentro do método constructor.

----------------------------------------------------------------------------------------------

Utilizando arquitetura MVC:

Model:      Representa a tabela da aplicação no banco.
            Models são criados SEMPRE com a primeira letra em maiúsculo.
            Também são criados SEMPRE em singular.

View:       Representa o front-end (react.js, vue.js, etc.).

Controller: Trata requisições e devolve respostas para a rota.

----------------------------------------------------------------------------------------------

Multer

Após a utilização do Multipart formdata no Insomnia para enviar os dados da casa ao banco,
foi necessário instalar uma nova biblioteca para enviar arquivos: yarn add multer

No inicio, os dados enviados eram apenas em JSON.

Configurado em: config/upload.js

----------------------------------------------------------------------------------------------

Cors

Controla a API a ser consumida por apenas um ou vários domínios.

yarn add cors

----------------------------------------------------------------------------------------------

Yup

Para tratar validações, importado nos controllers.

yarn add yup

----------------------------------------------------------------------------------------------

Extensões:
EditorConfig for VSCode
ESLint

Instalado ESLint para padrões de código.

yarn add eslint -D

Caminho para arrumar erros após a execução do ESLint:
1. Ctrl + Shift + P
2. Busca por: Open User Settings
3. Cola o código abaixo, e salva:

  //EsLint Config
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autofix": true
    },
    {
      "language": "typescript",
      "autofix": true
    },
    {
      "language": "typescriptreact",
      "autofix": true
    },
  ],

Também foram feitas alterações no .eslintrc.js

Prettier

Foi instalado a extensão prettier para o código ficar mais bonito.
Também foi instalado no terminal:

yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
Instala o prettier, a configuração dele com ESLint e o plugin dele com o mesmo.

Também foi criado um arquivo ".prettierrc" na raiz, com informações pra evitar conflitos.
"singleQuote": true // utilizar aspas simples

Para arrumar todos os arquvos conforme os padrões de código:
yarn eslint --fix src --ext .js

----------------------------------------------------------------------------------------------

Instalar as dependências caso esteja sem a pasta node_modules: yarn

----------------------------------------------------------------------------------------------

Algumas notas antigas importantes estão no meu crud, da minha pasta de estudo.

----------------------------------------- Fim das Notas ---------------------------------------- */

class App {
    // quando a classe app for chamada, o método construtor é o primeiro a ser iniciado automáticamente
    constructor() {
        // o this é necessário para referenciar a classe App
        this.server = express();

        // connection string
        const URI =
            "mongodb+srv://papauluk:SYTwbyWg59L05zmx@devhouse.hyory8h.mongodb.net/?retryWrites=true&w=majority";

        // conecta ao banco de dados mongodb
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // middlewares e routes devem ser chamados no constructor para serem iniciados
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // libera a API a ser utilizada por qualquer domínio
        this.server.use(cors());

        // uma rota criada dentro dos middlewares, para visualizar a thumbnail retornada
        this.server.use(
            "/files",
            express.static(path.resolve(__dirname, "..", "uploads"))
        );

        // consta que vai usar JSON no express
        this.server.use(express.json());
    }

    routes() {
        // chama as rotas da importação
        this.server.use(routes);
    }
}

// exporta a classe App (selecionando o server)
export default new App().server;
// module.exports = new App().server; // metodo antigo
