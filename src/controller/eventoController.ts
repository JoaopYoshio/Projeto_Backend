import {Request, Response} from "express";
import {EventoService} from "../service/eventoService";

export class EventoController {
	public async cadastrarEvento(req: Request, res: Response) {
		try {
			const novoEvento = await new EventoService().cadastrarEvento(req.body);

			return res.status(201).send(novoEvento);
		} catch (error) {
			res.status(409).send(error.message);
		}
	}

	public async consultarEvento(req: Request, res: Response) {
		try {
			const evento = await new EventoService().consultarEvento(req.params.id);

			return res.status(200).send(evento);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async atualizarEvento(req: Request, res: Response) {
		try {
			const evento = await new EventoService().atualizarEvento(req.params.id, req.body);

			return res.status(200).send(evento);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async atualizarEventoUsuario(req: Request, res: Response) {
		try {
			const evento = await new EventoService().atualizarEventoUsuario(req.params.id, req.body, req.params.idUsuario);

			return res.status(200).send(evento);
		} catch (error) {
			res.status(404).send(error.message);
		}
	}

	public async deletarEvento(req: Request, res: Response) {
		try {
			await new EventoService().deletarEvento(req.params.id, req.params.idAdmin);

			return res.status(200).send("Evento deletado com sucesso");
		} catch (error) {
			res.status(404).send(error.message);
		}
	}
}
