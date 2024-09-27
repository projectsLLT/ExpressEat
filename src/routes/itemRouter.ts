
import { Router } from "express"
import ItemController from "../controller/ItemController";

const itemRouter = Router();

itemRouter.get('/',ItemController.listAll)
itemRouter.post('/',ItemController.createItem)
itemRouter.put("/:id",ItemController.updateItem)
itemRouter.delete('/:id',ItemController.deleteItem)
itemRouter.delete('/all',ItemController.deleteAllItens)
itemRouter.get('/:id',ItemController.getItemById)
itemRouter.post('/:id', upload.single('image'), ItemController.uploadImage)

export default itemRouter;