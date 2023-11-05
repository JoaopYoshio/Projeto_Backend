import "dotenv/config";
import express from "express";
import routes from "./routes";
import mongoose from "mongoose";

export class App {
	public express: express.Application;

	public constructor() {
		this.express = express();

		this.middleware();
		this.database();
		this.routes();
	}

	public middleware(): void {
		this.express.use(express.json());
	}

	public routes(): void {
		this.express.use(routes);
	}

	private async database() {
		try {
			const stringConnection = process.env.DB_CONNECTION_STRING;
			mongoose.set("strictQuery", true);
			if(stringConnection) await mongoose.connect(stringConnection);
			console.log("Connect database success");
		} catch (err) {
			console.error("Connect database fail, error: ", err);
		}
	}
}
