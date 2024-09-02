import User from "../model/User";

class UserRepository {
    async getAll(){
        try{
        return await User.find();
        }catch(e){
            console.log(e);
            throw new Error('Erro ao listar usuarios')
        }
    }
}
export default new UserRepository();