const net = require("node:net");

//create a server using createServer Method

//we are creating a variable to store all the clients so that we can send the message all the clients if
//some client does the message,
//Server is chat-room, all clients connected should see each other messages when they ping in the chat room
const clientsArr = [];
const server = net.createServer();
server.on("connection", (socket) => {
	//socket is a client object, its a duplex stream
	console.log(`client has connected to the server`);
	//this listener automatically listens to the connection event and invokes this callback
	// everytime a client joins the server
	clientsArr.push(socket);
	console.log(clientsArr.length);
	socket.on("data", (message) => {
		clientsArr.map((c) => {
			c.write(message);
		});
	});
});

server.listen(3542, "127.0.0.1", () => {
	console.log(`server is up and lisetening`, server.address());
});
