module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        "airbnb-base",
        "prettier", // adicionado o prettier
    ],
    plugins: ["prettier"], // adiciona plugin do prettier
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error", // se o ESLint achar algo relacionado ao plugin prettier (para deixar o código melhor), aponta como erro
        "class-methods-use-this": "off", // métodos não precisam usar this
        "no-param-reassign": "off", // permite receber um parâmetro e fazer alterações nele
        // eslint-disable-next-line quote-props
        camelcase: "off", // permite criar variáveis diferentes de camelCase
        "no-underscore-dangle": "off", // permite receber parâmetros com _
        "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // inserir variáveis mesmo que não utilize (no caso next por causa dos middlewares)
    },
};
