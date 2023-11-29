const fs = require("node:fs/promises");

//opening a file using Promises
//try to read from a file and copy into the destionation

(async () => {
  //created a readable stream
	const rFile = await fs.open("./source.txt", "r");
	const readableStream = rFile.createReadStream();

	//creating a writable stream
	const wFile = fs.open("./destination.txt", "w");
	const writableDataStream = (await wFile).createWriteStream();

	readableStream.on("data", (chunk) => {
		writableDataStream.write(chunk);
	});
})();
