const net = require("node:net");

const server = net.createServer((socket) => {
	socket.on("data", (data) => {
		console.log(data.toString("utf-8"));
	});

	socket.on("end", () => {
		console.log(`client has disconnected`);
		socket.end();
	});
});

server.listen(3000, () => {
	console.log(`server is up and running`);
});
