const { Transform } = require("node:stream");

const fsPromises = require("node:fs/promises");

class CustomTransform extends Transform {
	constructor() {
		super();
	}
	_transform(chunk, encoding, callback) {
		for (let i = 0; i < chunk.length; i++) {
			if (chunk.length !== 255) {
				chunk[i] = chunk[i] - 1;
			}
		}

		callback(null, chunk);
		//this pushes the data and saying there is no error. First arg is the error obj
		//null means no error.
	}
}

(async () => {
	const readFileHandle = await fsPromises.open("./write.txt", "r");
	const writeFileHandle = await fsPromises.open("./decrypted.txt", "w");

	const readStream = readFileHandle.createReadStream();
	const writeStream = writeFileHandle.createWriteStream();

	const decryptTransform = new CustomTransform();
	//encrypt is an instance of the transform stream.

	readStream.pipe(decryptTransform).pipe(writeStream);
	/* 
   Action : we are reading from a encrypted file, which got encrypted while we run encryption.js
   now we are reading from that, and transforming the file contents ie decrypting the data 
   using the transform instance (_transform method does the job) and finally writes the content into
   the target decrypted.txt
  */
})();
