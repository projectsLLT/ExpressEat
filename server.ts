import express from 'express';
import mongoDb from './src/database/mongodbDatabase';

const app=express();
const port=process.env.Port;

app.use(express.json());

app.listen(port,()=>{
    console.log('Servidor On 🔥🔥');
    
})
