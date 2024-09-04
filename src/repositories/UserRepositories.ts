import { sign } from "jsonwebtoken";
import User from "../model/User";
import { bodyUser } from "../types/bodyUser";
import { userAutenticateType } from "../types/userAutenticateType";
import { hash, compare } from "bcrypt"

class UserRepository {
  async getAllUsers() {
    try {
      const usuarios = await User.find();
      return { usuarios, status: 200 };
    } catch (error) {
      return { message: `Erro ao listar usuarios`, status: 400, error };
    }
  }

  async getUserByEmail(email: string) {
    try {
      const usuario = await User.findOne({ email }).exec();
      return usuario? { usuario, status: 200 } : { message: `Usuario inexistente`, status: 404 };
    } catch (error) {
      return { message: `Erro ao listar usuario`, status: 400, error };
    }
  }

  async createUser({ nome, email, idade, localizacao, senha, cpf }: bodyUser) {
    try {
      const senhaCripitada = await hash(senha, 2);
      const usuario = await User.create({
        nome,
        email,
        idade,
        localizacao,
        senha: senhaCripitada,
        cpf,
      });
      return { usuario, status: 200 };
    } catch (error) {
      return { message: `Erro ao criar usuarios`, status: 400, error };
    }
  }

  async updateUser({ nome, idade, senha, localizacao }: bodyUser,email: string) {
    try {
      const data = await this.getUserByEmail(email);
      if (data.usuario) {
        const usuario = data.usuario;
        const senhaCripitada = await hash(senha, 2);
        const usuarioAtualizado = await User.findByIdAndUpdate(usuario._id, {
          nome,
          idade,
          senha: senhaCripitada,
          localizacao,
        });
        return { usuarioAtualizado, status: 200 };
      }
      return { message: `Usuario inexistente`, status: 404 };
    } catch (error) {
      return { message: `Erro ao criar usuarios`, status: 400, error };
    }
  }

  async deleteUser(email: string) {
    try {
      const data = await this.getUserByEmail(email);
      if (data.usuario) {
        const usuario = data.usuario;
        await User.findByIdAndDelete(usuario._id);
        const usuarios = await this.getAllUsers();
        return { usuarios, status: 200 };
      }
      return {message:"Usuario Inexistente",status:404}
    } catch (error) {
      return { message: `Erro ao deletar usuario`, status: 400, error };
    }
  }

  async authenticateUser({ email, senha }: userAutenticateType) {
    try {
      const data = await this.getUserByEmail(email);
      if (data.usuario) {
        const usuario = data.usuario;
        const verifyPassword = await compare(senha, usuario.senha);
        if(!verifyPassword){
            return {message:'Senha incorreta',status:404,error:null};
        }
        const token=sign(
            {
                id:usuario._id
            },
            process.env.TOKEN_KEY as string,
            {
                expiresIn:"12hrs"
            }
        )
        return {token,status:201}
      }
      return {message:"Email incorreto",status:404,error:null}

    } catch (error) {
        return {message:"Email incorreto",status:404,error}
    }
  }
}
export default new UserRepository();
