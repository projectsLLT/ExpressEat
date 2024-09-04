import express from "express";
import UserRouter from "./src/routes/UserRouter";
import restauranteRouter from "./src/routes/restauranteRouter";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', UserRouter);
app.use('/restaurantes',restauranteRouter)

app.listen(port, () => {
  console.log("Servidor On 🔥🔥");
});
