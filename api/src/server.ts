// src/server.ts
import { app } from "./app";
import cors from "cors";
import http from "http";
import { createServer } from "./socket";
const server = http.createServer(app);

const io = createServer(server);

app.use(cors()); // TODO - limit to specific origins

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello!");
});

io.on("connection", (socket) => {
	console.log("User connected.");
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
