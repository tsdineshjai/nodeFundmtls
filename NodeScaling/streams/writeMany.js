const fs = require("node:fs");

/* 
write to a file a content and write one million times.
*/
(async () => {
	console.time(`writeMany`);

	fs.open("ark.txt", "w", (err, fd) => {
		console.log(`ark.txt id number  is ${fd}`);
		fs.writeSync(fd, "just classifield");
	});

	fs.open("test.txt", "w", (err, fd) => {
		console.log(fd);
		for (let i = 0; i < 1000; i++) {
			fs.writeSync(fd, ` ${i} `);
		}

		console.timeEnd("writeMany");
	});
})();
