import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const mongoDb=mongoose;

const mongoUri=process.env.Mong_URI as string;

async function conectar(){
    await mongoDb.connect(mongoUri)
        .then(() => console.log('Conectado ao MongoDB com sucesso!'))
        .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
}

conectar();

export default mongoDb;