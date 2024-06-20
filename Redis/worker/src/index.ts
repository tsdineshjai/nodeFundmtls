import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
	const { problemId, code, language } = JSON.parse(submission);

	console.log(`proessing submission for problemId ${problemId}`);
	console.log(`code : ${code}`);
	console.log(`Language: ${language}`);

	await new Promise((resolve) => setTimeout(resolve, 1000));

	console.log(`Finished Proessin submission for problemId ${problemId}`);

	client.publish("problem_done", JSON.stringify({ problemId, status: "TLE" }));
}

async function startWorker() {
	try {
		await client.connect();
		console.log(`worker connected to redis`);

		while (true) {
			try {
				const submission = await client.brPop("problems", 0);

				//@ts-ignore
				await processSubmission(submission.element);
			} catch (error) {
				console.error(`Error processing submission:`, error);
			}
		}
	} catch (error) {
		console.log(`Failed to connect Redis server`, error);
	}
}

startWorker();
