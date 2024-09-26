import express  from "express";
import ItemController from "../controller/ItemController";
import upload from "../middlewares/configMulter";

const itemRouter = express.Router();

itemRouter.get('/',ItemController.listAll)
itemRouter.post('/',ItemController.createItem)
itemRouter.put("/:id",ItemController.updateItem)
itemRouter.delete('/:id',ItemController.deleteItem)
itemRouter.delete('/all',ItemController.deleteAllItens)
itemRouter.get('/:id',ItemController.getItemById)
itemRouter.post('/:id', upload.single('image'), ItemController.uploadImage)

export default itemRouter;