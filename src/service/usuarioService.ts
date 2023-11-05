import usuarioModel from "../models/usuarioSchema";
import { UsuarioTypes } from "src/types/usuarioTypes";


export class UsuarioService {
	public async cadastrarUsuario(usuario: UsuarioTypes) {
		if(!usuario.nome) throw new Error("Nome do usuário é obrigatório");
		if(!usuario.email) throw new Error("E-mail do usuário é obrigatório");
		if(!usuario.senha) throw new Error("Senha do usuário é obrigatório");

		const email = await usuarioModel.findOne({"email": usuario.email});
		if(email) throw new Error("Esse e-mail já está sendo utilizado por outra conta!");

		const senha = await usuarioModel.findOne({"senha": usuario.senha});
		if(senha) throw new Error("Essa senha já está sendo utilizado por outra conta!");

		const dadosUsuario = {
			email: usuario.email,
			senha: usuario.senha,
			nome: usuario.nome
		};

		await usuarioModel.create(dadosUsuario);
	}

	public async consultarUsuario(id: string) {
		const usuario = await usuarioModel.findById(id);
		if (!usuario) throw new Error("Usuário não encontrado");

		return usuario;
	}
	
	public async atualizarUsuario(idUsuario: string, dadosAtualizado: UsuarioTypes) {
		const usuario = await usuarioModel.findById(idUsuario);
		if (!usuario) throw new Error("Usuário não encontrado");
		await usuarioModel.findByIdAndUpdate(idUsuario, dadosAtualizado);

		return this.consultarUsuario(idUsuario);
	}

	public async deleteUsuario(idUsuario: string) {
		const usuario = await usuarioModel.findById(idUsuario);
		if (!usuario) throw new Error("Usuário não encontrado");
        
		return await usuarioModel.findByIdAndDelete(idUsuario);
	}

}

