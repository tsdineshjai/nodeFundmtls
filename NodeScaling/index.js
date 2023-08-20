const fs = require("node:fs/promises");
(async () => {
	//COMMANDS
	const CREATE_FILE = "create a file";
	const DELETE_FILE = "delete a file";
	const RENAME_FILE = "rename a file";
	const ADD_TO_FILE = "add to a file";

	async function CreateAFile(path) {
		try {
			//trying to check if the file already exists
			const fileHandle = await fs.open(path, "r");
			fileHandle.close();
			console.log(`file already exists`);

			//if it already exists it will not cause an error
			//this will go to the catch block if the file doesnt exists.
		} catch (e) {
			//we are writing a file, if the file doesnt exists, it will create and a write intofile
			//second argument is the content of the file.
			const creatAfileHandle = await fs.writeFile(
				path,
				"keep on doing",
				(er) => {
					if (err) {
						console.log(`error writing file: ${er.message}`);
					} else {
						console.log(`success writing the file`);
					}
				}
			);
		}
	}
	fileHandle.on("change", async () => {
		//callback is getting executed once the change event is identified.

		const bufferSize = await fileHandle.stat();
		const { size } = bufferSize;
		const buff = Buffer.alloc(size);
		await fileHandle.read(buff, 0, size, 0);
		//here we are storing the read contents into the buffer and so can
		//get the data by accessing buffer
		const command = buff.toString("utf-8");

		//to create a file
		if (command.includes("create a file")) {
			const filePath = command.substring(CREATE_FILE.length + 1);
			//arg gives the starting index and since no end arg is provided, it copies till the end
			console.log(filePath);

			CreateAFile(filePath);
		}

		//to delete a file
		if (command.includes(DELETE_FILE)) {
			const filePath = command.substring(DELETE_FILE.length + 1);
			console.log(filePath);
			await fs.unlink(filePath, (err) => {
				if (err) throw err;
				console.log(`file was successfully deleted.`);
			});
		}

		//to renama a file
		if (command.includes(RENAME_FILE)) {
			const filePath = command.substring(RENAME_FILE.length + 1);
			await fs.rename(filePath, __dirname + "/" + "renamed.txt");
		}

		//to add to the file path
		if (command.includes(ADD_TO_FILE)) {
			const path = command.substring(ADD_TO_FILE.length + 1);
			await fs.appendFile(path, "This is going to be huge thing");
			console.log(`file is successfully appended`);
		}
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
