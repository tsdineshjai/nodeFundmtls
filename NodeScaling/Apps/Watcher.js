const fs = require("node:fs/promises");
(async () => {
	//COMMANDS
	const CREATE_FILE = "create a file";
	const DELETE_FILE = "delete a file";
	const RENAME_FILE = "rename a file";
	const ADD_TO_FILE = "add to a file";

	const fileHandle = await fs.open("./watch.txt", "r");

	let addedContent;

	const addToFile = async (path, content) => {
		if (addedContent === content) return;
		try {
			const fileHandle = await fs.open(path, "a");
			fileHandle.write(content);
			addedContent = content;
			console.log("The content was added successfully.");
		} catch (e) {
			console.log("An error occurred while removing the file: ");
			console.log(e);
		}
	};
	const renameFile = async (oldPath, newPath) => {
		try {
			await fs.rename(oldPath, newPath);
			console.log("The file was successfully renamed.");
		} catch (e) {
			if (e.code === "ENOENT") {
				console.log(
					"No file at this path to rename, or the destination doesn't exist."
				);
			} else {
				console.log("An error occurred while removing the file: ");
				console.log(e);
			}
		}
	};
	const deleteFile = async (path) => {
		try {
			await fs.unlink(path);
			console.log("The file was successfully removed.");
		} catch (e) {
			if (e.code === "ENOENT") {
				console.log("No file at this path to remove.");
			} else {
				console.log("An error occurred while removing the file: ");
				console.log(e);
			}
		}
	};

	async function CreateAFile(path) {
		try {
			const fileHandle = await fs.open(path, "r");
			//trying to check if the file already exists
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

		//create a file to created.txt
		if (command.includes(CREATE_FILE)) {
			const filePath = command.substring(CREATE_FILE.length + 1);
			//arg gives the starting index and since no end arg is provided, it copies till the end
			CreateAFile(filePath);
		}

		//to delete a file
		if (command.includes(DELETE_FILE)) {
			const filePath = command.substring(DELETE_FILE.length + 1);
			deleteFile(filePath);
		}

		//to renama a file
		if (command.includes(RENAME_FILE)) {
			const __indx = command.indexOf(" to ");
			const oldFilePath = command.substring(RENAME_FILE.length + 1, __indx);
			const newFilePath = command.substring(__indx + 4);
			renameFile(oldFilePath, newFilePath);
		}

		//to add to the file path
		if (command.includes(ADD_TO_FILE)) {
			const _idx = command.indexOf(" this content: ");
			const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
			const content = command.substring(_idx + 15);
			addToFile(filePath, content);
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
