import * as dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { RegisterErrorMiddleware } from "../errorMiddleware";
import * as swaggerJson from "../build/swagger.json";

export const app = express();

// Use body parser to read sent json payloads
app.use(
	urlencoded({
		extended: true,
	})
);
app.use(json());
app.use(cors()); // TODO - limit to specific origins

const options: swaggerUi.SwaggerUiOptions = {
	swaggerUrl: "/docs/oauth2-redirect.html",
	swaggerOptions: {
		oauth: {
			clientId: "7514a59b-5436-4a03-aba1-3075b7d32935", // ODO Env var
			usePkceWithAuthorizationCodeGrant: true,
			scopes: "openid offline_access https://chessapp.onmicrosoft.com/chess-app-api/Api.General", // TODO env var
		},
	},
};
app.use(["/docs"], swaggerUi.serve, swaggerUi.setup(swaggerJson, options));

// app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
// 	return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
// });

RegisterRoutes(app);
RegisterErrorMiddleware(app);
