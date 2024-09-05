import Restaurante from "../model/Restaurante";
import { AutenticateType } from "../types/AutenticateType";
import { bodyRestauranteType } from "../types/bodyRestauranteType";
import { hash } from "bcrypt";

class RestauranteRepository{
    async getAll(){
        try {
            const restaurantes=await Restaurante.find();
            return {restaurantes,status:200}
        } catch (error) {
            return {message:"erro ao listar restaurantes",status:400,error}
        }
    }

    async getRestauranteByEmail(email:string){
        try {
            const restaurante=await Restaurante.findOne({email}).exec;
            return {restaurante,status:200}
        } catch (error) {
            return {message:"erro ao listar restaurante",status:404,error}
        }
    }

    async createRestaurante({nome,email,senha,localizacao,cnpj}:bodyRestauranteType){
        try {
            const senhaCripitografada=await hash(senha,2);
            const restaurante=await Restaurante.create({
                nome,
                email,
                senha:senhaCripitografada,
                cnpj,
                localizacao
            })

            return {restaurante,status:201}
        } catch (error) {
            return {message:"erro ao criar restaurante",status:400,error}
        }
    }

    async authenticateRestaurante({email,senha}:AutenticateType){

    }
}

export default new RestauranteRepository();