import User from "../model/User";
import { bodyUser } from "../types/bodyUser";
import { hash } from "bcrypt";

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
      return usuario
        ? { usuario, status: 200 }
        : { message: `Usuario inexistente`, status: 404 };
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
  async updateUser(
    { nome, idade, senha, localizacao }: bodyUser,
    email: string
  ) {
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
    } catch (error) {
      return { message: `Erro ao deletar usuario`, status: 400, error };
    }
  }
}
export default new UserRepository();
