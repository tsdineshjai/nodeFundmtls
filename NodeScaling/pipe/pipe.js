// const fs = require("node:fs/promises");

// //to read from a file and copy into another file using pipes
// (async () => {
// 	//performance : ~16ms
// 	console.time(`pipe`);
// 	//opening a source file
// 	const readFile = await fs.open("./test.txt", "r");

// 	//create a readable Stream
// 	const readableStream = readFile.createReadStream();

// 	//opening a destination file
// 	const writeFile = await fs.open("./destinationPipe.txt", "w");

// 	//creating a writable stream
// 	const writableStream = writeFile.createWriteStream();

// 	let bytesRead = -1;
// 	while (bytesRead) {
// 		const readResult = await readFile.read();
// 		//it can only read up to size of its buffer .
// 		bytesRead = readResult.bytesRead;
// 		if (bytesRead !== 16384) {
// 			const indexNotFilled = readResult.buffer.indexOf(0);
// 			//it will give the index of the firt zero in the buffer. From that index the buffer is fille empty
// 			let newBuffer = Buffer.alloc(indexNotFilled);
// 			//we are creating a new buffer with that size.idea is create a buffer with a size of data and not to waste
// 			//extra bytes of size.
// 			readResult.buffer.copy(newBuffer, 0, 0, indexNotFilled);
// 			//Copies data from a region of buf to a region in target, even if the targetmemory region overlaps with buf.
// 			//source is readResult.buffer.copy target is newBuffer
// 			writableStream.write(newBuffer);
// 		} else {
// 			writableStream.write(readResult.buffer);
// 		}
// 	}
// 	console.timeEnd(`pipe`);
// })();

const fs = require("node:fs/promises");

(async () => {
	const readFile = await fs.open("./test.txt", "r");
	const writeFile = await fs.open("./destinationPipe.txt", "w");

	const readStream = readFile.createReadStream();
	const writeStream = writeFile.createWriteStream();

	readStream.pipe(writeStream);
	//pipes establishes a chain to a writableStream/destination should always be writable stream
})();
