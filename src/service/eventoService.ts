import eventoSchema from "../models/eventoSchema";
import {GrupoService} from "./grupoService";
import { EventoTypes } from "src/types/eventosTypes";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export class EventoService {
	public async cadastrarEvento(dadosEventos: EventoTypes) {
		if (!dadosEventos.nomeEvento){
			throw new Error("Nome do evento é obrigatório");
		} else if (!dadosEventos.dataEvento) {
			throw new Error("Data do evento é obrigatório");
		} else if (!dadosEventos.horarioEvento) {
			throw new Error("Horário da evento é obrigatório");
		} else if (!dadosEventos.local) {
			throw new Error("Local da evento é obrigatório");
		}

		if(dadosEventos.grupo){
			const dadosGrupo = await new GrupoService().consultarGrupo(dadosEventos.grupo);
			if(!dadosGrupo) throw new Error("Grupo não encontrado!");
			//validar se o usuário que está criando o evento é admin 

			if (!dadosGrupo?.eventoAtivo) 
				throw new Error("Existe uma evento ativo para esse grupo, finalize o evento antes de gerar uma novo.");

			const intergrantesEvento = dadosGrupo.usuarios.map(integrante => {
				const usuarios = {
					usuario: integrante.usuario,
					confirmacaoEvento: false,
					contribuicaoEvento: false,
				};
		
				return usuarios;
			});

			const adminsGrupo = dadosGrupo.usuarios.filter(integrante => {
				if (integrante.admin === true ) return integrante.usuario;
			})
			
			const evento = {
				grupo: dadosEventos.grupo,
				nomeEvento:dadosEventos.nomeEvento,
				adminId: adminsGrupo,
				dataEvento: dadosEventos.dataEvento,
				horarioEvento: dadosEventos.horarioEvento,
				local: dadosEventos.local,
				usuarios: intergrantesEvento,
			};
			
			const novoEvento = await eventoSchema.create(evento);
			await new GrupoService().atualizarGrupo(dadosEventos.grupo, {eventoAtivo: novoEvento._id});
			return novoEvento;
		}else{

			const usuarios = {
				usuario: dadosEventos.adminId,
				confirmacaoEvento: true,
				contribuicaoEvento: false,
			};

			const evento = {
				grupo: dadosEventos.grupo,
				nomeEvento:dadosEventos.nomeEvento,
				adminId: dadosEventos.adminId,
				dataEvento: dadosEventos.dataEvento,
				horarioEvento: dadosEventos.horarioEvento,
				local: dadosEventos.local,
				usuarios: usuarios,
			};

			const novoEvento = await eventoSchema.create(evento);
			return novoEvento;
		}
	}

	public async consultarEvento(idEvento: string) {
		const evento = await eventoSchema.findById(idEvento).populate("usuarios.usuario");

		if (!evento) throw new Error("Evento não encontrada");

		return evento;
	}

	public async atualizarEvento(id: string, dadosAtualizado: EventoTypes) {
		const evento =  await this.consultarEvento(id);
		if (!evento) throw new Error("Evento não encontrada");
		// const user = evento.adminId.find(user => user._id.equals(admin));
		// if(!user) throw new Error("Usuário não é administrador do evento!");
		//Melhorar a forma de atualizar o evento/ admin atualiza tudo, !admin atualiza só seu registro

		await eventoSchema.findByIdAndUpdate(id, dadosAtualizado);

		return await this.consultarEvento(id);
	}

	public async atualizarEventoUsuario(id: string, dadosAtualizado: EventoTypes, idUsuario: string) {
		const evento =  await this.consultarEvento(id);
		if (!evento) throw new Error("Evento não encontrada");
	
		const userIndex = evento.usuarios.findIndex(user => user.usuario?._id.toString() == idUsuario);
		if (userIndex === -1) throw new Error("Usuário não encontrado");

		evento.usuarios[userIndex] = {usuario: new ObjectId(idUsuario), ...dadosAtualizado};

		await eventoSchema.findByIdAndUpdate(id, evento);

		return await this.consultarEvento(id);
	}

	public async deletarEvento(idEvento: string, admin: string) {
		const dadosEvento =  await this.consultarEvento(idEvento);
		if (!dadosEvento) throw new Error("Evento não encontrada");

		const user = dadosEvento.adminId.find(user => user._id.equals(admin));
		if(!user) throw new Error("Usuário não e administrador do evento!");

		return eventoSchema.findByIdAndDelete(idEvento);
	}
}
