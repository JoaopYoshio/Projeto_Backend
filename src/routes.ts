import { Router } from "express";
import { UsuarioController } from "./controller/usuarioController";
import { GrupoController } from "./controller/grupoController";
import { EventoController } from "./controller/eventoController";

const routes = Router();

//Usuario
routes.post("/cadastrarUsuario", new UsuarioController().cadastrarUsuario);
routes.get("/consultarUsuario/:id", new UsuarioController().consultarUsuario);
routes.patch("/atualizarUsuario/:id", new UsuarioController().atualizarUsuario);
routes.delete("/deletarUsuario/:id", new UsuarioController().deletarUsuario);

//Grupo
routes.post("/cadastrarGrupo/:admin", new GrupoController().cadastrarGrupo);
routes.get("/consultarGrupo/:id", new GrupoController().consultarGrupo);
routes.patch("/atualizarGrupo/:id", new GrupoController().atualizarGrupo);
routes.delete("/deletarGrupo/:id", new GrupoController().deletarGrupo);

//Evento
routes.post("/cadastrarEvento", new EventoController().cadastrarEvento);
routes.get("/consultarEvento/:id", new EventoController().consultarEvento);
routes.patch("/atualizarEvento/:id", new EventoController().atualizarEvento);
routes.patch("/atualizarEvento/:id/Usuario/:idUsuario", new EventoController().atualizarEventoUsuario);
routes.delete("/deletarEvento/:id", new EventoController().deletarEvento);

export default routes;