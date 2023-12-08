const net = require("node:net");
const fs = require("node:fs/promises");

//if promises you should use async and await

//create a server

let fileHandle, writeStream;

const server = net.createServer({ host: "::1", port: 5050 }, async (socket) => {
	//this callback will automatically listen for "connection" evnt and will incoke this cb once there is a conn
	console.log(`connection has been established`);
	//opening the target file to write into
	fileHandle = await fs.open("./storage/destination.md", "w");

	//set up a writing stream to write the data into the destination
	writeStream = fileHandle.createWriteStream();

	socket.on("data", (chunk) => {
		writeStream.write(chunk);
	});

	socket.on("end", () => {
		fileHandle.close();
		console.log(`write processing was finished`);
	});

	socket.on("error", () => {
		console.log(`client has disconnected`);
	});
  //this cb listeere will get invoked once client press Ctrl + C to disconnect.
});

//listening to the server
server.listen(5050, "::1", () => {
	console.log(`server is up and running`, server.address());
});
