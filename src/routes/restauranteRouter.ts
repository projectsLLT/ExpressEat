import express  from "express";
import RestauranteController from "../controller/RestauranteController";

const restauranteRouter=express.Router();

restauranteRouter.get('/',RestauranteController.listAll);

export default restauranteRouter;