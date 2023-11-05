import { Request, Response } from "express";
import { UsuarioService } from "../service/usuarioService";

export class UsuarioController {
	public async cadastrarUsuario(req: Request, res: Response) {
		try {
			await new UsuarioService().cadastrarUsuario(req.body);

			return res.status(201).send("Usuário criado com sucesso!");
		} catch (error) {
			res.status(400).send(error.message);
		}
	}

	public async consultarUsuario(req: Request, res: Response) {
		try {
			const usuario = await new UsuarioService().consultarUsuario(req.params.id);

			return res.send(usuario).status(200);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async atualizarUsuario(req: Request, res: Response) {
		try {
			const usuarioAtualizado = await new UsuarioService().atualizarUsuario(req.params.id, req.body);

			return res.send(usuarioAtualizado).status(200);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async deletarUsuario(req: Request, res: Response) {
		try {
			await new UsuarioService().deleteUsuario(req.params.id);

			return res.send("Usuário deletado com sucesso").status(200);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}
}