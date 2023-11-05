import { Error } from "mongoose";
import grupoSchema from "../models/grupoSchema";
import { GrupoTypes } from "src/types/grupoTypes";
import { UsuarioService } from "./usuarioService";
import mongoose from "mongoose";
import usuarioSchema from "src/models/usuarioSchema";
const ObjectId = mongoose.Types.ObjectId;

export class GrupoService {
	public async cadastrarGrupo(grupo: GrupoTypes, admin: string) {
		if(!grupo.nomeGrupo) throw new Error("Nome do grupo é obrigatório");

		const dadosGrupo = {
			nomeGrupo: grupo.nomeGrupo,
			descricao: grupo.descricao,
			usuarios: [{
				usuario: admin,
				admin: true
			}]
		};

		const novoGrupo = await grupoSchema.create(dadosGrupo);
		new UsuarioService().atualizarGruposUsuario(admin, novoGrupo._id)
		return novoGrupo;
	}

	public async consultarGrupo(idGrupo: string) {
		const grupo = await grupoSchema.findById(idGrupo).populate("usuarios.usuario");
		if (!grupo) throw new Error("Grupo não encontrado");

		return grupo;
	}

	public async atualizarGrupo(idGrupo: string, dadosAtualizado: object) {
		const grupo = await this.consultarGrupo(idGrupo);
		if(!grupo) throw new Error("Evento não encontrada");
		await grupoSchema.findByIdAndUpdate(idGrupo, dadosAtualizado);

		return this.consultarGrupo(idGrupo);
	}

	public async adicionarUsuario(idGrupo: string, idNovoUsuario: string) {
		const grupo = await this.consultarGrupo(idGrupo);
		if(!grupo) throw new Error("Evento não encontrada");
		const novoUsuario = {
			usuario: new ObjectId(idNovoUsuario),
			admin: false,
		}
		grupo.usuarios = [...grupo.usuarios, novoUsuario];
		await new UsuarioService().atualizarGruposUsuario(idNovoUsuario, new ObjectId(idGrupo));
		await grupoSchema.findByIdAndUpdate(idGrupo, grupo);

		return this.consultarGrupo(idGrupo);
	}
	
	public async deletarGrupo(idGrupo: string) {
		const grupo = await this.consultarGrupo(idGrupo);
		if(!grupo) throw new Error("Evento não encontrada");

		return await grupoSchema.findByIdAndDelete(idGrupo);
	}
}