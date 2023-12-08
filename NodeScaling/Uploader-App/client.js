const net = require("node:net");

const fs = require("node:fs/promises");

//creating a client and establishign the connection

const client = net.createConnection({ host: "::1", port: 5050 }, async () => {
	console.log(`connected to the server`);

	//trying to read a file
	/* 
  list of things to do to read a file
    1. open the file using fs.open
    2. create a readStream.
    3. listen for the data event, data will flow once you start attachin cb listeners
  */
	const fileHandle = await fs.open("./source.md", "r");
	//file decriptor, a number assigned to the fileHandle.

	const readStream = fileHandle.createReadStream();
	readStream.on("data", (chunk) => {
		client.write(chunk);
	});

	readStream.on("end", () => {
		console.log(`data processing has ended, so we are closing the stream`);
		fileHandle.close();
	});
});
