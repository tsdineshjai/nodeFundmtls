const net = require("node:net");

//create a server using createServer Method

const server = net.createServer((socket) => {
	//this listener automatically listens to the connection event and emits the below log
	console.log(`client has joined to the server`);

	socket.on("data", (data) => {
		console.log(`Received data from client: ${data}`);
	});
});

server.listen(3542, "127.0.0.1", () => {
	console.log(`server is up and lisetening`);
});
