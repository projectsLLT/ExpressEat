import Restaurante from "../model/Restaurante";

class RestauranteRepository{
    async getAll(){
        try {
            const restaurantes=await Restaurante.find();
            return {restaurantes,status:200}
        } catch (error) {
            return {message:"erro ao listar restaurantes",status:400,error}
        }
    }
}

export default new RestauranteRepository();