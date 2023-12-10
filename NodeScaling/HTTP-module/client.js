const http = require("node:http");

const keepAliveHttpAgent = http.Agent({ keepAlive: true });

const client = http.request(
	"http:localhost:8050",
	{
		agent: keepAliveHttpAgent,
		host: "http:localhost:8050",
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
	}
);

client.on("error", (e) => {
	console.error(`problem with request: ${e.message}`);
});

//returne client is duplex stream

client.write(JSON.stringify({ mode: "i am in alpha mindset always" }));

client.end();
