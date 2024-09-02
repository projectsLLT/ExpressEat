import UserController from "../controller/UserController";
import express  from "express";

const UserRouter = express.Router();

UserRouter.get('/',UserController.listAll)

export default UserRouter;