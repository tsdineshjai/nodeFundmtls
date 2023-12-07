const net = require("node:net");

//create a server using createServer Method

const server = net.createServer((socket) => {
	//this listener automatically listens to the connection event and emits the below log
	console.log(`client has joined to the server`);
	socket.on("data", (message) => {
		console.log(`message was received : ${message}`);
	});
});

server.on("connection", (socket) => {
	//socket we get here is the client socket that has connected to the server
	//we have initiated client connection in the client.js file using net.createConnection() method
	console.log(`client has connected to the server`);
});

server.listen(3542, "127.0.0.1", () => {
	console.log(`server is up and lisetening`, server.address());
});
