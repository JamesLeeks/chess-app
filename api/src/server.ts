// src/server.ts
import { app } from "./app";
import cors from "cors";
import http from "http";
import { createServer } from "./socket";
import { Socket } from "socket.io";
import passport from "passport";
import { registerStrategies } from "../authentication";
import { gameService } from "./games/GameService";

const server = http.createServer(app);

const io = createServer(server); // create socket io server

app.use(cors()); // TODO - limit to specific origins

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello!");
});

io.engine.use((req: any, res: any, next: any) => {
	registerStrategies();
	const isHandshake = req._query.sid === undefined;
	if (isHandshake) {
		try {
			passport.authenticate("AADB2C", { session: false })(req, res, next);
		} catch (e) {
			console.log("Handshake error", { e });
		}
	} else {
		next();
	}
});

io.on("connection", (socket: Socket) => {
	// socket.handshake.headers
	async function thingy() {
		const gameId = socket.handshake.auth.gameId;
		const reqAny = socket.request as any;
		const user = reqAny.user;
		console.log("User connected.", { gameId, user });
		if (gameId) {
			const response = await gameService.get(gameId);
			if (user.id === response?.game.ownerId) {
				socket.join(`game-${gameId}`);
			} else {
				console.log("user not authorised to see game");
			}
		} else {
			console.log("expected game id");
		}
	}
	thingy();
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
