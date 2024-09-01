import express from 'express';

const app=express();
const port=process.env.Port;

app.use(express.json());

app.listen(port,()=>{
    console.log('Servidor On 🔥🔥');
    
})
