import { Request, Response } from "express";
import { GrupoService } from "../service/grupoService";

export class GrupoController {
	public async cadastrarGrupo(req: Request, res: Response) {
		try {
			const novoGrupo = await new GrupoService().cadastrarGrupo(req.body, req.params.admin);

			return res.send(novoGrupo).status(201);
		} catch (error) {
			res.status(400).send(error.message);
		}
	}

	public async consultarGrupo(req: Request, res: Response) {
		try {
			const novoGrupo = await new GrupoService().consultarGrupo(req.params.id);

			return res.send(novoGrupo).status(200);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async atualizarGrupo(req: Request, res: Response) {
		try {
			const grupoAtualizado = await new GrupoService().atualizarGrupo(req.params.id, req.body);

			return res.send(grupoAtualizado).status(200);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async deletarGrupo(req: Request, res: Response) {
		try {
			await new GrupoService().deletarGrupo(req.params.id);

			return res.send("Grupo deletado com sucesso").status(200);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}
}