// const fs = require("node:fs/promises");

// //opening a file using Promises

// (async () => {
//   const file = await fs.open("./test.txt", "r");

//   const readableStream = file.createReadStream();

//   readableStream.on("data", (chunk) => {
//     console.log(chunk);
//   });
// })();

/* opening a readable stream using callback API */

const fs = require("node:fs");

(async () => {
	const fileHandle = fs.createReadStream("./test.txt", "utf-8");

	fileHandle.on("data", (chunk) => {
		console.log(chunk);
	});
})();
