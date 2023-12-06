const net = require("node:net");

const client = net.createConnection({ port: 3542, host: "127.0.0.1" }, () => {
	console.log(`connected to the server`);
});

client.write("hello");
