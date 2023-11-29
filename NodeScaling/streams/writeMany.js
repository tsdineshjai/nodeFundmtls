// const fs = require("node:fs/promises");

// (async () => {
// 	console.time(`writeMany`);
// 	const fileHandler = await fs.open("test.txt", "w");

// 	const stream = fileHandler.createWriteStream();

// 	for (let i = 0; i < 1000000; i++) {
// 		const buff = Buffer.from(` ${i} `, "utf-8");

// 		/*
// 		this method will return false when the internal buffer gets filled up to its max
// 		will return true if it still has some space to fill.
// 		we are supposed to wait for the buffer to get flushed and ready
// 		before we perform the write operation.
// 		*/
// 		if (stream.write(buff) === true) {
// 			stream.write(buff);
// 		} else {
// 			stream.on("drain", () => {
// 				stream.write(buff);
// 			});
// 		}
// 	}

// 	console.timeEnd(`writeMany`);
// })();

/* this is call back API, always there is an associated CB which will be called once the async 
operations is performed.
*/
const fs = require("node:fs");

(async () => {
	console.time("started");

	fs.open("./test.txt", "w", (err, fd) => {
		for (let i = 0; i < 10000; i++) {
			const buff = Buffer.from(`${i}`, "utf-8");
			fs.write(fd, buff, () => {});
		}
	});
	console.timeEnd("started");
})();

// const fs = require("node:fs/promises");

// (async () => {
// 	console.time("started");

// 	const fileHandle = await fs.open("./test.txt", "w");
// 	const stream = fileHandle.createWriteStream();
// 	for (let i = 0; i < 10000; i++) {
// 		const buff = Buffer.from(`${i}`, "utf-8");
// 		stream.write(buff);
// 	}

// 	console.timeEnd("started");
// })();
