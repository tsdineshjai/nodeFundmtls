const { Writable } = require("node:stream");
const fs = require("node:fs");

class CustomWritable extends Writable {
	//Calls the stream.Writable() constructor.
	constructor({ filename, highWaterMark }) {
		super();
		this.highWaterMark = highWaterMark;
		this.filename = filename;
		this.fd = null;
		this.chunks = [];
		this.chunkSize = 0;
	}

	//construct method will be called after the constructor method ,
	//construct method is used to open a resource, do some asynchornous operation etc.
	// until this method is finished, none of the methods will be invoked eg:write and read,
	//transform, final and delay
	_construct(callback) {
		//opening a file using fs callback API - callback API has a callback.
		fs.open(this.filename, (err, fd) => {
			if (err) {
				return callback(err);
			} else {
				this.fd = fd;
				console.log(this.fd);
				//no args  means the operation is succesful.
				callback();
			}
		});
	}

	_write(chunk, encoding, callback) {
		this.chunks = this.chunks.push(chunk);
		this.chunkSize += chunk.length;

		if (this.chunkSize > this.highWaterMark) {
			fs.write(this.fd, Buffer.concat(this.chunks), 0, 0, 0, (err) => {
				if (err) {
					return callback(err);
				} else {
					this.chunks = [];
					this.chunkSize = 0;
					callback();
					//  callback with no arguments is called to denote there  is no issue
				}
			});
		}
	}
}

const customStream = new CustomWritable({
	highWaterMark: 1800,
	filename: "./test.txt",
});

//when you invoke this file, construcotr method of CustomWritable will be calle and soon after that
//the construct method will be called too.
