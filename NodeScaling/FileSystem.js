const fs = require("node:fs");

fs.writeFile(
	"./testing.txt",
	"discipline and stick to timetable, give the discipline the max thing",
	{
		flag: "a",
	},
	(error, data) => {
		if (error) {
			console.log("there is an error");
		} else {
			console.log("data write was succesful");
		}
	}
);

//writing two methods of reading and writing the file using the fs/promises

const fs = require("node:fs/promises");

// #first method using promises;

fs.readFile("./greet.txt", "utf-8")
	.then((dataw) => console.log(dataw))
	.catch((error) => console.log(error));

//second method of reading and writing files using node:fs/promises using async await

//async await is syntanctial sugar on the promises

const fs = require("node:fs/promises");

//create a function
async function readFileContent() {
	try {
		const contents = await fs.readFile("./greet.txt", "utf-8");
		console.log(contents);
	} catch (error) {
		console.log(error);
	}
}

//invoke the function
readFileContent();

/* -------------------------- */

const fs = require("node:fs");

//creating a readable stream for the file
const stream = fs.createReadStream("./greet.txt", {
	encoding: "utf-8",
	start: 5,
	highWaterMark: 16,
});

//event Handlers for the file, events being emitted like start, end , close.

stream.on("data", (data) => {
	console.log(data, `event has started`);
});

stream.on("close", () => {
	console.log(`event was closed`);
});
stream.on("end", () => {
	console.log(`stream was closed`);
});

stream.on("error", (error) => {
	console.error(`Error reading the file: ${error.message}`);
});

/* -------------------------- */
/* creating a writable stream */

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

/* PIPES: connects the readble stream to writable stream , this enables 
automatically listening to the data event*/

/* writing to a file using streams */

const fs = require("node:fs/promises");

(async () => {
	console.time("writeMany");

	const file = await fs.open("success.txt", "w");

	const stream = file.createWriteStream();

	for (let i = 0; i < 1000; i++) {
		const buff = Buffer.from(`${i}`, "utf-8");
		stream.write(buff);
	}
	console.timeEnd("writeMany");
})();

/*  */

const fs = require("node:fs/promises");

//opening a file using Promises

(async () => {
	const file = await fs.open("./test.txt", "r");

	const readableStream = file.createReadStream();

	readableStream.on("data", (chunk) => {
		console.log(chunk);
	});
})();

/* opening a readable stream using callback API */

const fs = require("node:fs");

(async () => {
	const fileHandle = fs.createReadStream("./test.txt", "utf-8");

	fileHandle.on("data", (chunk) => {
		console.log(chunk);
	});
})();

/*  */
