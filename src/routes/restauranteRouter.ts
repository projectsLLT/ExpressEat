import express  from "express";
import RestauranteController from "../controller/RestauranteController";

const restauranteRouter=express.Router();

restauranteRouter.get('/',RestauranteController.listAll);
restauranteRouter.post('/',RestauranteController.registerRestaurante);

export default restauranteRouter;