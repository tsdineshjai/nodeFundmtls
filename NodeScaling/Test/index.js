const fs = require("node:fs");

//creating a readable stream for the file
const readableStream = fs.createReadStream("./greet.txt", {
	encoding: "utf-8",
	start: 5,
	highWaterMark: 16,
});

//creating a writableDataStream

const writableDataStream = fs.createWriteStream("./copyOfGreet.txt");

//event Handlers for the file, events being emitted like start, end , close.

//whenver data is being read, the event "data"is emitted and we are listening for that particular event.
readableStream.on("data", (chunk) => {
	console.log(chunk, `event has started`);
	writableDataStream.write(chunk);
});

readableStream.on("close", () => {
	console.log(`the stream was closed automatically`);
});
