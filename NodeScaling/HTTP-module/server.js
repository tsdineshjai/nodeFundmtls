const http = require("node:http");

const server = http.createServer();

// Listen to the request event

server.on("request", (request, response) => {
	//request is about the incoming request and response is what this server would send as a reponse
	//both are objects: request comes with four maint thigsn: method,url, headers and request body

	console.log(request.method);
	console.log(request.url);
	console.log(request.headers);

	//this is why we have to listen to body  (request.body) like how we listen for a readig stream

	request.on("data", (chunk) => {
		console.log(chunk.toString("utf-8"));
	});
});

server.listen(8050, () => {
	console.log("Server listening on http://localhost:8050");
});
