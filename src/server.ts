import { App } from "./app";

const PORT = 3000;

const server = new App().express; 

function main(){
	try{
		server.listen(PORT, "localhost",async () => { 
			console.log("Servidor ativo");});
	}catch(err){
		console.error("Erro ao ativar servidor", err);
	}
}

main();