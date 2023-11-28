const fs = require("node:fs/promises");

(async () => {
	console.time("writeMany");

	const file = await fs.open("success.txt", "w");

	const stream = file.createWriteStream();

	for (let i = 0; i < 1000; i++) {
		const buff = Buffer.from(`${i}`, "utf-8");
		stream.write(buff);
	}
	console.timeEnd("writeMany");
})();
