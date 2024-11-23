// src/server.ts
import { app } from "./app";
import cors from "cors";

app.use(cors()); // TODO - limit to specific origins

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello!");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
