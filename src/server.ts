import { App } from "./app";

const server = new App().express; 

function main(){
	try{
		server.listen(3000, "localhost",async () => { 
			console.log("Servidor ativo");});
	}catch(err){
		console.error("Erro ao ativar servidor", err);
	}
}

main();