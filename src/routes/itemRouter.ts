
import { Router } from "express"
import ItemController from "../controller/ItemController";

const itemRouter = Router();

itemRouter.get('/',ItemController.listAll)
itemRouter.post('/', ItemController.createItem)
itemRouter.put("/",ItemController.updateItem)
itemRouter.delete('/',ItemController.deleteItem)
itemRouter.delete('/itens/all',ItemController.deleteAllItens)
itemRouter.get('/itens/id',ItemController.getItemById)

export default itemRouter