const { Transform } = require("node:stream");

const fsPromises = require("node:fs/promises");
const { write } = require("node:fs");

class CustomTransform extends Transform {
	constructor() {
		super();
	}
	_transform(chunk, encoding, callback) {
		/* we are trying to transform the data by adding 1 to each element of the buffer
    
    Remember each element of a buffer in node by default holds 8 bits and a max size of chunk is 255 byteslength.
    so we are making sure we are not going beyond the number. if the size is less than 255,
    we are adding one and if not, we are not adding one. 
    <34+1 f3+1 76+1 87+1>
    */

		console.log(chunk.length);

		for (let i = 0; i < chunk.length; i++) {
			if (chunk.length !== 255) {
				chunk[i] = chunk[i] + 1;
			}
		}

		this.push(chunk);
		callback();

		//callback with empty aruments represents: all went fine.

		/*
      you can use the first two lines of code or the below one. 
    		callback(null, data);
        null represents there is no error. actually first argument is Error object. 
     */
	}
}

(async () => {
	const readFileHandle = await fsPromises.open("./read.txt", "r");
	const writeFileHandle = await fsPromises.open("./write.txt", "w");

	const readStream = readFileHandle.createReadStream();
	const writeStream = writeFileHandle.createWriteStream();

	const encrypt = new CustomTransform();
	//encrypt is an instance of the transform stream.

	readStream.pipe(encrypt).pipe(writeStream);
	/* 
    We are chaining a readable stream to encrypt stream,, then chaining encryupt to write stream
    pipe(argument)  we have to place the stream in the argument of pipe method
  */
})();
