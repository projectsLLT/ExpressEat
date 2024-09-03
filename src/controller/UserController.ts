import UserRepository from "../repositories/UserRepositories";
import { Request,Response } from "express";

class UserController{

    async listAllUsers(req:Request,res:Response){
        const data=await UserRepository.getAllUsers();

        data.status === 200
        ? res.status(200).json(data.usuarios)
        : res.status(data.status).json({message:data.message,erro:data.error}); 
    }

    async listUserByEmail(req:Request,res:Response){
        const {email}=req.params;
        const data=await UserRepository.getUserByEmail(email);

        data.status === 200
        ? res.status(200).json(data.usuario)
        : res.status(data.status).json({message:data.message,erro:data.error}); 
    }

    async registerUser(req:Request,res:Response){
        const {nome,email,idade,localizacao,senha,cpf}=req.body;
        const result =await UserRepository.createUser({nome,email,idade,localizacao,senha,cpf});

        result.status === 200
        ? res.status(200).json(result.usuario)
        : res.status(result.status).json({message:result.message,erro:result.error}); 
    }
    async editUser(req:Request,res:Response){
        const {nome,idade,localizacao,senha}=req.body;
        const {email}=req.params;

        const result =await UserRepository.updateUser({nome,idade,localizacao,senha},email)

        result.status === 200
        ? res.status(200).json(result.usuarioAtualizado)
        : res.status(result.status).json({message:result.message,erro:result.error}); 
    }
}
export default new UserController();