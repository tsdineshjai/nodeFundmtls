const http = require("node:http");

const keepAliveHttpAgent = new http.Agent({ keepAlive: true });

const client = http.request(
	{
		agent: keepAliveHttpAgent,
		hostname: "localhost",
		method: "POST",
		path: "/game",
		port: 8050,
		timeout: 5000,
		headers: {
			"Content-Type": "application/json",
		},
	},
	(res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

		//for response body we cant do like how its accessed above
		//we have to listen like a streawm
		res.on("data", (chunk) => {
			console.log(chunk.toString("utf-8"));
		});
	}
);

client.on("error", (e) => {
	console.error(`problem with request: ${e.message}`);
});

//returne client is duplex stream

client.write(JSON.stringify({ mode: "i am in alpha mindset always" }));
client.write(
	JSON.stringify({
		mode: "i am in hyperactive hyper energetic hyper positive hyper calm hype happy",
	})
);

client.end();
