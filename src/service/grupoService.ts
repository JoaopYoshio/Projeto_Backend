import { Error } from "mongoose";
import grupoSchema from "../models/grupoSchema";
import { GrupoTypes } from "src/types/grupoTypes";

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

		return await grupoSchema.create(dadosGrupo);
	}

	public async consultarGrupo(idGrupo: string) {
		const grupo = await grupoSchema.findById(idGrupo).populate("usuarios.usuario");
		if (!grupo) throw new Error("Grupo não encontrado");

		return grupo;
	}

	public async atualizarGrupo(idGrupo: string, dadosAtualizado: object) {
		const grupo = this.consultarGrupo(idGrupo);
		if(!grupo) throw new Error("Evento não encontrada");
		await grupoSchema.findByIdAndUpdate(idGrupo, dadosAtualizado);

		return this.consultarGrupo(idGrupo);
	}
	
	public async deletarGrupo(idGrupo: string) {
		const grupo = this.consultarGrupo(idGrupo);
		if(!grupo) throw new Error("Evento não encontrada");

		return await grupoSchema.findByIdAndDelete(idGrupo);
	}
}