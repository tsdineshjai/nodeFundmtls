const fs = require("node:fs/promises");

const http = require("node:http");

const server = http.createServer();

server.on("request", async (request, response) => {
	console.log(request.url, request.method);
	if (request.url === "/" && request.method === "GET") {
		response.setHeader("Content-type", "text/html");
		const readFile = await fs.open("./public/index.html", "r");
		//setting a stream is ideal when dealing with large file in size to gradual buffering.

		const readStream = readFile.createReadStream();
		//using pipe to read the conents from readstream and put into the target
		//here we are directly sending the content to the response object. It can render.
		readStream.pipe(response);
	}
	if (request.url === "/styles.css" && request.method === "GET") {
		response.setHeader("Content-type", "text/css");

		const readFile = await fs.open("./public/styles.css", "r");
		//setting a stream is ideal when dealing with large file in size to gradual buffering.

		const readStream = readFile.createReadStream();
		//using pipe to read the conents from readstream and put into the target
		//here we are directly sending the content to the response object. It can render.
		readStream.pipe(response);
	}

	if (request.url === "/alpha" && request.method === "GET") {
		response.setHeader("Content-type", "text/html");
		const alphaFile = await fs.open("./public/qualities.html", "r");
		const alphaStream = alphaFile.createReadStream();
		alphaStream.pipe(response);
	}

	//handling a POST requst that was sent via POSTMAN

	if (request.url === "/login" && request.method === "POST") {
		response.setHeader("Content-type", "application/json");
		response.statusCode = 403;
		const body = {
			message: "first you have to login",
		};
		response.end(JSON.stringify(body));
	}

	//handling a PUT request : sent via postman

	if (request.url === "/upload" && request.method === "PUT") {
		response.setHeader("Content-type", "application/json");

		const imageFile = await fs.open("./public/storage/tower.jpeg", "w");

		const imageFileStream = imageFile.createWriteStream();
		//put the data in the stream, stream will copy the data in chunks and will write into the target.

		//reading the content using pipe and channeling into writeStream.
		request.pipe(imageFileStream);

		//listening to the end of reading process from the request object.
		request.on("end", () => {
			console.log(`we have completed reading the request`);

			//sending a response to the client. always to use this method. or else the client will be waiting, assuming
			//there is yet to come.
			response.end(
				JSON.stringify({
					message: "Uploading of the file is done.",
				})
			);
		});
	}
});

server.listen("5555", () => {
	console.log(`server is up and runnig and listening to the port activity`);
});
