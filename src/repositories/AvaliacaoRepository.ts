import Avaliacao from "../model/Avaliação";
import { AvaliacaoType } from "../types/AvaliacaoType";
import RestauranteRepository from "./RestauranteRepository";
import UserRepository from "./UserRepository";

class AvaliacaoRepository{
    async userAvaliationRestaurante({idUser,idRestaurante,nota}:AvaliacaoType){
        try{
            const verifyUser=await UserRepository.getUserById(idUser);
            if(!verifyUser.usuario){
                return {message:'usuario inexistente',status:verifyUser.status}
            }

            const verifyRestaurante=await RestauranteRepository.getRestauranteById(idRestaurante);
            if(!verifyRestaurante.restaurante){
                return {message:verifyRestaurante.message,status:verifyUser.status}
            }

          const avaliacao=await Avaliacao.create({
            idUser,
            idRestaurante,
            nota
          })
          return {avaliacao,status:201}
        }catch(error){
            return {message:"error ao criar avaliacao",status:400,error}
        }
      }
}

export default new AvaliacaoRepository();