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
// const fs = require("node:fs");

// (async () => {
// 	console.time("started");

// 	fs.open("./test.txt", "w", (err, fd) => {
// 		for (let i = 0; i < 10000; i++) {
// 			const buff = Buffer.from(`${i}`, "utf-8");
// 			fs.write(fd, buff, () => {});
// 		}
// 	});
// 	console.timeEnd("started");
// })();

const fs = require("node:fs/promises");

(async () => {
	const fileHandle = await fs.open("./test.txt", "w");
	const stream = fileHandle.createWriteStream();
	/* 
	in the above two steps: we opened a file, to perform a write operation, first line of code will reutrn
	a fd(aka file handle) ie file descriptor,thats a reference to the file .
	Then we crated a stream on the filehandle, thats liek creating a tunnel , to push data into it
	when you create a stream, stream object gets created. it has methods,properites , events and also 
	important one ie Internal buffer with a fixed size (highwaterMark)
	*/
	stream.setMaxListeners(1);

	console.time("event");
	for (let i = 0; i < 10000; i++) {
		const buff = Buffer.from(`${i}`, "utf-8");

		/* stream.write(buff) returns false when the buffer is filled., ideally we dont want to further
		load data into the buffer(As it cant , if still done, it would put that data on the computer internal memory)
		so we wait for the buffer to flush it (emits drain event), once its done its ready to go again.
		*/
		if (!stream.write(buff)) {
			stream.on("drain", () => {
				console.log(
					`internal buffer is flushed aka drained and now ready to do the process again`
				);
			});
			stream.write(buff);
		} else {
			stream.write(buff);
		}
	}
	console.timeEnd("event");
	// fileHandle.close();
})();

/* listenign the finish event which gets emitted when the stream is being closed using end method */

const fs = require("node:fs");

const file = fs.createWriteStream("./hello.txt");

file.write("Hello");
console.log(file.bytesWritten);

file.end("world!");

file.on("finish", () => {
	console.log(`the stream has finished doing its job`);
});
