const { Duplex } = require("node:stream");

const fs = require("node:fs");

//performs both Readable stream and Writable straem
//we must implement both methods, ie read and write method in the class Definition
class CustomDuplex extends Duplex {
	constructor({
		readFile,
		targetFile,
		readableHighWaterMark,
		writableHighWaterMark,
	}) {
		super({ readableHighWaterMark, writableHighWaterMark });
		this.readFileName = readFile;
		this.targetFilenName = targetFile;
		this.readFd = null;
		this.writeFd = null;
		this.chunks = [];
		this.chunkSize = 0;
	}

	_construct(callback) {
		fs.open(this.readFileName, "r", (err, readFD) => {
			if (err) {
				return callback(err);
				//there is issue in opening the file
			} else {
				this.readFd = readFD;
				fs.open(this.targetFilenName, "w", (err, writeFD) => {
					if (err) {
						return callback(err);
						//there is issue in opening the file
					} else {
						this.writeFd = writeFD;
						callback();
						//no issue now
					}
				});
			}
		});
	}
	_write(chunk, encoding, callback) {
		this.chunks.push(chunk);
		this.chunkSize += chunk.length;

		fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
			if (err) {
				return callback(err);
			} else {
				++this.numberOfWrites;
				this.chunks = [];
				this.chunkSize = 0;
				callback();
				//  callback with no arguments is called to denote there is no issue
			}
		});
	}

	_read(n) {
		const buff = Buffer.alloc(n);

		fs.read(this.readFd, buff, 0, n, null, (err, bytesRead, buffer) => {
			if (err) {
				return this.destroy(err);
			} else {
				console.log(buffer.toString("utf-8"));
				//this.push(data) will return false once it cannot push furthermore, means all the data is read from the source
				this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
				//the reason we do subarray so that we get elements untill the bytesRead and exclude 0s
				// null is to indicate the end of stream
				//pushing a data in to the buffer fo read stream will emit a "data" event.
			}
		});
	}

	_final(callback) {
		console.log(`i have entered into _final method body`);
		fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
			if (err) {
				return callback(err);
			} else {
				this.chunks = [];
				callback();
			}
		});
	}

	_destroy(error, callback) {
		callback(error);
	}
}

const DuplexStream = new CustomDuplex({
	readFile: "./read.txt",
	targetFile: "./write.txt",
});

DuplexStream.write(Buffer.from("this is a string 0\n"));
DuplexStream.write(Buffer.from("this is a string 1\n"));
DuplexStream.write(Buffer.from("this is a string 2\n"));
DuplexStream.write(Buffer.from("this is a string 3\n"));
DuplexStream.write(Buffer.from("this is a string 4\n"));
