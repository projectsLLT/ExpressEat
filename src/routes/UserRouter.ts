import UserController from "../controller/UserController";
import express  from "express";
import UserRepositories from "../repositories/UserRepositories";

const UserRouter = express.Router();

UserRouter.get('/',UserController.listAllUsers);
UserRouter.get('/:email',UserController.listUserByEmail)
UserRouter.post('/',UserController.registerUser);
UserRouter.put('/:email',UserController.editUser);

export default UserRouter;