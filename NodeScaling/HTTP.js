//creating a server and listening to it
const http = require("node:http");

const server = http.createServer((req, res) => {
	//you are writing to the response header.
	res.writeHead(200, "connection is trying to happen", {
		"Content-type": "application/json",
	});

	const obj = {
		message: "connectio is succesful",
		capability:
			"you have the capabilty too do things and you will disiciplined and follow time schedulel",
	};

	res.end(JSON.stringify(obj));
});

server.listen("3000", () => {
	console.log(`server is up and running`);
});
