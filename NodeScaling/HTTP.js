//creating a server and listening to it
const http = require("node:http");

const server = http.createServer((req, res) => {
	//you are writing to the response header.
	res.writeHead(200, "connection is trying to happen", {
		"Content-type": "text/plain",
	});

	res.end("<header>Sign Up</header>");
});

server.listen("3000", () => {
	console.log(`server is up and running`);
});

/* loading an html page */

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
	//you are writing to the response header.
	res.writeHead(200, "connection is trying to happen", {
		"Content-type": "text/html",
	});
	const html = fs.readFileSync(__dirname + "/index.html", "utf-8");
	//find the reference of the html

	res.end(html);
	//load the file , this marks end of the stream.
});

server.listen("3000", () => {
	console.log(`server is up and running`);
});

/* listening to different end points and req.url gives what the end user is trying to acccess

 we can provide the content accordingly
*/

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.writeHead(200, "home page", {
			"Content-type": "text/plain",
		});

		res.end("This is the home page");
	}

	if (req.url == "/disicpline") {
		res.writeHead(200, "this is the displcine page", {
			"Content-type": "text/html",
		});

		res.end(" <h1> Discipline gets you everything </h1>");
	}

	if (req.url == "/json") {
		res.writeHead(200, {
			"Content-type": "application/json",
		});

		res.end(
			JSON.stringify({
				message: "this content type is applicaiton/json",
				discipline:
					"discpline gets you everythign and there is nothing in the world that yu are not capable of ",
			})
		);
	}
});


/*  */