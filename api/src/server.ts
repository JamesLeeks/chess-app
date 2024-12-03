// src/server.ts
import { app } from "./app";
import cors from "cors";
import http from "http";
import { createServer } from "./socket";
import { Socket } from "socket.io";
const server = http.createServer(app);

const io = createServer(server);

app.use(cors()); // TODO - limit to specific origins

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello!");
});

io.on("connection", (socket: Socket) => {
	// socket.handshake.headers
	const gameId = socket.handshake.auth.gameId;
	console.log("User connected.", { gameId });
	if (gameId) {
		socket.join(`game-${gameId}`);
	}
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
