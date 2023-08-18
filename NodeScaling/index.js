const fs = require("node:fs/promises");
(async () => {
	const fileHandle = await fs.open("./watch.txt", "r");
	//Opens a FileHandle and a number(id) will be assigned to it for tracking process

	fileHandle.on("change", async () => {
		//callback is getting executed once the change event is identified.
		const bufferSize = await fileHandle.stat();
		const { size } = bufferSize;
		const contents = await fileHandle.read(Buffer.alloc(size), 0, size, 0);
		console.log(contents.buffer.toString());
	});

	//watcher...
	const watcher = fs.watch("./watch.txt");
	for await (const event of watcher) {
		console.log(event);
		/* event --> { eventType: 'change', filename: 'watch.txt' }	*/
		if (event.eventType === "change") {
			fileHandle.emit("change");
			//emitting a "change" event.
		}
	}
})();
