import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		unique: true
	},
	senha: {
		type: String,
		require: true,
		unique: true,
		select: false
	},
	nome: {
		type: String,
		require: true
	},
	grupos: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Grupo'
	}
}, { versionKey: false });

export default mongoose.model("Usuario", usuarioSchema);