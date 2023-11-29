const { WriteStream } = require("node:fs");
const fs = require("node:fs/promises");

//opening a file using Promises
//try to read from a file and copy into the destionation

(async () => {
	console.time("process");
	//created a readable stream
	const rFile = await fs.open("./source.txt", "r");
	const readableStream = rFile.createReadStream();

	//creating a writable stream
	const wFile = fs.open("./destination.txt", "w");
	const writeStream = (await wFile).createWriteStream();

	readableStream.on("data", (chunk) => {
		/*    writeStream.write(chunk) will return false if the internal buffer inside the stream object gets full
		and it needs to be flushed out to be ready for next batch   */

		if (!writeStream.write(chunk)) {
			readableStream.pause();
			//The readable.pause() method will cause a stream in flowing mode to stop
			//emitting 'data' events, switching out of flowing mode
		}
	});

	//drain will be emitted once the data is full in buffer and its flushes out after it copies into the target.
	readableStream.on("drain", () => {
		readableStream.resume();
		//The 'resume' event is emitted when stream.resume() is called and readableFlowing is not true.
	});

	console.timeEnd("process");

	rFile.close();
	wFile.close();
})();
/* 
sequence of events
1.file was opened to read with read mode
2. readable stream was created on the opened file
3.file was openen to write with write mode
4. writable stream was created on the opened write file.
5. listening to the data event, data events gets emitted by attaching a listener call back to data event
6. once it catches the data event, we have started using the writeStream to write into the destination
7. important : The buffer of the stream object gets full once its capacity is reached , if you can keep
on writing then there will be a performance and memory issue (because the buffer to flush on the data, before even to 
  do that, if we impose, it will store the data on the systemes internal memory.)
8. so whenver the buffer reaches its capacity, we need to pause for a while, so that it can flush out the copied data
and get ready for the next batch.
9. whenever buffer gets full, writeStream.write(data) returns false. THis is the way we get to know the buffer is full
10. when buffer is full, we pause on the readableStream. Meanwhile the buffer of stream object flushes out and gets ready
11. we need to attach a listner callback for the drain event. Because while flushing drain event will be emitted
In that callback we can resume the readable stream.
*/
