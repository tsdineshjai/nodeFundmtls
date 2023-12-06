const net = require("node:net");

const socket = net.createConnection({ port: 3000 }, () => {
	setInterval(() => {
		socket.write("hello");
	}, 1000);

	//signalling to end the socket connection from client side
	setInterval(() => {
		socket.end();
	}, 5000);
});

socket.on("connect", () => {
	console.log(`connection was established`);
});

socket.on("end", () => {
	console.log(`server has discconnected by sending a FIN flag:finish`);
});
