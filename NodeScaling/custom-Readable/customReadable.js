const { Readable } = require("node:stream");
const fs = require("node:fs");

class CustomReadable extends Readable {
	constructor({ fileName, highWaterMark }) {
		super({ highWaterMark });
		this.fileName = fileName;
		this.fd = null;
	}

	_construct(callback) {
		fs.open(this.fileName, "r", (err, fd) => {
			if (err) {
				return callback(err);
				//there is issue in opening the file
			} else {
				this.fd = fd;
				console.log(this.fd);
				callback();
				//no issue now
			}
		});
	}

	//size is the argument to the read mehtod
	_read(n) {
		const buff = Buffer.alloc(n);

		fs.read(this.fd, buff, 0, n, 0, (err, bytesRead, buffer) => {
			if (err) {
				this.destroy(err);
			} else {
				//this.push(data) will return false once it cannot push furthermore, means all the data is read from the source
				this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
				//the reason we do subarray so that we get elements untill the bytesRead and exclude 0s
				// null is to indicate the end of stream
				//pushing a data in to the buffer fo read stream will emit a "data" event.
				setTimeout(() => {
					this.push(null);
				}, 3000);
			}
		});
	}

	_destroy(error, callback) {
		if (this.fd) {
			fs.close(this.fd, (err) => {
				if (err) callback(err || error);
			});
		} else {
			callback();
		}
	}
}

const rStream = new CustomReadable({
	fileName: "./test.txt",
	highWaterMark: 16384,
});

rStream.read(7777);

rStream.on("data", (data) => {
	console.log(data.toString("utf-8"));
});
// this is will be on a loop, because this emits the data event and again callback will be called
//to end that we need to push null to the this.push() method
