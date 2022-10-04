import multer from "multer";
import path from 'path'; // trabalhar com pastas

export default {
    // dados para armazenar local
    storage: multer.diskStorage({
        
        /* __dirname: raiz da aplicação

        O destino não foi informado da forma '../../uploads', pois a aplicação foi desenvolvida no windows,
        sendo assim, a barra (\) é invertida. Da forma abaixo, garanta a consistência da aplicação
        indepentente do sistema operacional.
        */
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        
        /* Parâmetros função filename

        requisição, arquivo e callback

        file: recebemos o nome do arquivo, tamanho, extensão, etc.
        cb: chamado após manipular o arquivo.
        */
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname); // captura a extensão do arquivo
            const name = path.basename(file.originalname, ext); // captura o nome completo do arquivo
            
            /* Parâmetros função cb

            null: caso gere um erro não precisa de tratamento
            
            Depois, o nome da imagem é montado com o nome, data atual do sistema e extensão
            */
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    })
}