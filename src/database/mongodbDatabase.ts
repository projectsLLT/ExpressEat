import mongoose from 'mongoose'

const mongoDb=mongoose

const mongoUri='mongodb://localhost:27017/expresseat'

async function conectar(){
    await mongoDb.connect(mongoUri)
        .then(() => console.log('Conectado ao MongoDB com sucesso!'))
        .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
}

conectar();

export default mongoDb;