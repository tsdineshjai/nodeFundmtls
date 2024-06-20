import express from "express";

import { createClient } from "redis";

const app = express();

app.use(express.json());

const client = createClient();

client.on("error", (err) => console.log("Redis client error", err));

app.post("/submit", async (req, res) => {
	const problemId = req.body.problemId;
	const code = req.body.code;
	const language = req.body.language;

	//trying to push takss to redis queue on  post requst of "submit" path
	try {
		await client.lPush(
			"problems",
			JSON.stringify({ code, language, problemId })
		);

		res.status(200).send("Submission received and stored.");
	} catch (error) {
		console.error("Redis Error", error);

		res.status(500).send("Failed to store Submission");
	}
});

async function startServer() {
	try {
		await client.connect();
		console.log(`connected to Redis`);

		app.listen(3000, () => {
			console.log("Server is running on port 3000");
		});
	} catch (error) {
		console.log(`Failed to connect to Redis`, error);
	}
}

startServer();
