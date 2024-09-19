import express  from "express";
import ItemController from "../controller/ItemController";

const itemRouter = express.Router();

itemRouter.get('/itens',ItemController.listAll)
itemRouter.post('/itens', ItemController.createItem)
itemRouter.put("/itens",ItemController.updateItem)
itemRouter.delete('/itens',ItemController.deleteItem)
itemRouter.delete('/itens/all',ItemController.deleteAllItens)
itemRouter.get('/itens/id',ItemController.getItemById)