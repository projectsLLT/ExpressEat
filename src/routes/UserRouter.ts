import UserController from "../controller/UserController";
import express  from "express";
import { verifyToken } from "../middlewares/verifyToken";

const UserRouter = express.Router();

UserRouter.post('/login',UserController.authenticateUser)
UserRouter.get('/',UserController.listAllUsers);
UserRouter.get('/:email',UserController.listUserByEmail)
UserRouter.post('/',UserController.registerUser);
UserRouter.put('/',verifyToken,UserController.editUser);
UserRouter.delete('/',verifyToken,UserController.eraseUser)

export default UserRouter;