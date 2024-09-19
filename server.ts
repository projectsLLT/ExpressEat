import express from "express";
import userRouter from "./src/routes/userRouter";
import restauranteRouter from "./src/routes/restauranteRouter";
import pedidoRouter from "./src/routes/pedidoRouter"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', userRouter);
app.use('/restaurantes',restauranteRouter)
app.use('/pedidos',pedidoRouter)

app.listen(port, () => {
  console.log("Servidor On 🔥🔥");
});
