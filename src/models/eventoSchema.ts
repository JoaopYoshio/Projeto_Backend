import mongoose from "mongoose";

const evento = new mongoose.Schema({
	grupo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Grupo'
	},
	nomeEvento: String,
	adminId: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
		require: true
	}],
	dataEvento: {
		type: Date,
		require: true
	},
	horarioEvento: {
		type: String,
		require: true
	},
	local: {
		type: String,
		require: true
	},
	usuarios: [{
		usuario:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuario'
		},
		confirmacaoEvento: Boolean,
		contribuicaoEvento: Boolean,
		_id : false,
		versionKey: false
	}],
}, { versionKey: false });

export default mongoose.model("Evento", evento);