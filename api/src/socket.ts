import { Server } from "socket.io";
import http from "http";

let io: Server | null = null;

export function createServer(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
	if (io) {
		throw new Error("Should not create second server.");
	}
	io = new Server(server, {
		cors: {
			origin: "*",
		},
	});

	return io;
}

export function getServer() {
	if (!io) {
		throw new Error("Server should exist.");
	}
	return io;
}
