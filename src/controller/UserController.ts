import UserRepository from "../repositories/UserRepositories";
import { Request,Response } from "express";

class UserController{

    async listAll(req:Request,res:Response){
        const data=await UserRepository.getAll();
        res.json(data);
    }
}
export default new UserController();