const express = require('express');
const routes = require('./routes'); // requisita o arquivo routes.js (não é uma dependência!)

// qualquer dúvida, comparar o código com o "crud" criado em my_study. ;)

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
module.exports = new App().server;