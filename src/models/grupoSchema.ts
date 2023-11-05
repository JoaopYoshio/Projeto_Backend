import mongoose from "mongoose";

const grupo = new mongoose.Schema({
	nomeGrupo: {
		type: String, 
		require: true
	}, 
	descricao: {
		type: String
	},
	usuarios: [{
		usuario:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuario'
		},
		admin: Boolean,
		_id: false
	}],
	eventoAtivo: String,
	historicoEventos: [String]
}, { versionKey: false });

export default mongoose.model("Grupo", grupo);