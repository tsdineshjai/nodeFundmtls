const fs = require("node:fs/promises");

const http = require("node:http");

const server = http.createServer();

server.on("request", async (request, response) => {
	console.log(request.url, request.method);
	if (request.url === "/" && request.method === "GET") {
		const readFile = await fs.open("./public/index.html", "r");

		//setting a stream is ideal when dealing with large file in size to gradual buffering.

		const readStream = readFile.createReadStream();

		//using pipe to read the conents from readstream and put into the target
		//here we are directly sending the content to the response object. It can render.
		readStream.pipe(response);
	}
});

server.listen("5555", () => {
	console.log(`server is up and runnig and listening to the port activity`);
});
