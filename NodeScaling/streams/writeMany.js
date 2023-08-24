const fs = require("node:fs/promises");

/* 
write to a file a content and write one million times.
*/
(async () => {
	//to perform read or write or any operation we need to open a file

	console.time("timeMany");
	const file = await fs.open("./test.txt", "w");
	for (let i = 0; i < 10000; i++) {
		await file.write(` ${i} `);
	}

	console.timeEnd("timeMany");
	await file.close();
	console.log(`all code lines were executed.`);
})();


