import { Request,Response } from "express";
import RestauranteRepository from "../repositories/RestauranteRepository";

class restauranteController{
    async listAll(req:Request,res:Response){
        const result=await RestauranteRepository.getAll();
        result.status===200
        ? res.status(200).json(result.restaurantes)
        : res.status(400).json({message:result.message,erro:result.error})
    }

    async registerRestaurante(req:Request,res:Response){
        const {nome,email,localizacao,senha,cnpj}=req.body
        const result=await RestauranteRepository.createRestaurante({nome,email,localizacao,senha,cnpj});

        result.status===201
        ? res.status(200).json(result.restaurante)
        : res.status(400).json({message:result.message,erro:result.error})
    }
}

export default new restauranteController();