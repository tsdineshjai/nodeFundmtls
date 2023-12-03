const { Writable } = require("node:stream");
const fs = require("node:fs");

class CustomWritable extends Writable {
	//Calls the stream.Writable() constructor.
	constructor({ fileName, highWaterMark }) {
		super({ highWaterMark });
		//this super method modifies the defaul highWaterMark size 16kb to our custom size.
		this.fileName = fileName;
		this.fd = null;
		this.chunks = [];
		this.chunkSize = 0;
		this.numberOfWrites = 0;
	}

	//construct method will be called after the constructor method ,
	//construct method is used to open a resource, do some asynchornous operation etc.
	// until this method is finished, none of the methods will be invoked eg:write and read,
	//transform, final and delay
	_construct(callback) {
		//opening a file using fs callback API - callback API has a callback.
		fs.open(this.fileName, "w", (err, fd) => {
			if (err) {
				callback(err);
			} else {
				this.fd = fd;
				//no args  means the operation is succesful.
				callback();
			}
		});
	}

	_write(chunk, encoding, callback) {
		this.chunks.push(chunk);
		this.chunkSize += chunk.length;

		//below write will only happen if the size is greater than highWaterMark

		if (this.chunkSize > this.writableHighWaterMark) {
			fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
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
		} else {
			callback();
		}
	}

	//Call this function (optionally with an error argument) when finished writing any remaining data.
	//THis method wont be called until you write end method of the instance :customWriteStream.end(Buffer.from("We have finished writing"));
	//once the callback is called, it would emit finish event. _final method will be called just before we finish writing.

	_final(callback) {
		console.log(`i have entered into _final method body`);
		fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
			if (err) {
				return callback(err);
			} else {
				++this.numberOfWrites;
				this.chunks = [];
				callback();
			}
		});
	}

	//destroy method destroys the stream. if you wish to drain before destroying the stream, use stream.end method
	//or wait for drain event.

	_destroy(err, callback) {
		if (this.fd) {
			fs.close(this.fd, (error) => {
				if (error) callback(error || err);
			});
		} else {
			callback(error);
		}
	}
}

const customWriteStream = new CustomWritable({
	highWaterMark: 1800,
	fileName: "./test.txt",
});

customWriteStream.write(
	Buffer.from("I am going to make great strides this new year")
);

customWriteStream.end(Buffer.from("We have finished writing"));

customWriteStream.on("finish", () => {
	console.log(
		`we have finished writing and final method has emitted finish event. `
	);
});

// console.log(customWriteStream._writableState.highWaterMark);

//when you invoke this file, construcotr method of CustomWritable will be called and soon after that
//the construct method will be called too.
