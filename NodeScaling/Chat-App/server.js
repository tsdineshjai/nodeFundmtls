const net = require("node:net");

//create a server using createServer Method

//we are creating a variable to store all the clients so that we can send the message all the clients if
//some client does the message,
//Server is chat-room, all clients connected should see each other messages when they ping in the chat room
const clientsArr = [];
const server = net.createServer();

//socket is a client object, its a duplex stream
//this listener automatically listens to the connection event and invokes this callback
// everytime a client joins the server

server.on("connection", (socket) => {
	console.log(`client has connected to the server`);
	const clientID = clientsArr.length + 1;
	//now we are sending back a messge with clientID to the client via socket.so that client can inlcude its iD
	// in all its messages.

	socket.write(`id-${clientID}`);

	clientsArr.map((client) => {
		client.socket.write(`user ${clientID} has joined the server`);
	});
	clientsArr.push({ id: clientID.toString(), socket });

	socket.on("data", (message) => {
		const str = message.toString("utf-8");
		const userID = str.substring(0, str.indexOf("-"));
		const msg = str.substring(str.indexOf("-") + 1);
		clientsArr.map((client) => {
			client.socket.write(`user-${userID} > ${msg} `);
		});
	});

	socket.on("error", () => {
		clientsArr.map((client) => {
			client.socket.write(`user ${clientID} has left the server`);
		});
	});
});

server.listen(3542, "127.0.0.1", () => {
	console.log(`server is up and lisetening`, server.address());
});
