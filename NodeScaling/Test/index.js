const fs = require("node:fs");

fs.writeFile(
	"./testing.txt",
	"discipline and stick to timetable, give the discipline the max thing",
	{
		flag: "a",
	},
	(error, data) => {
		if (error) {
			console.log("there is an error");
		} else {
			console.log("data write was succesful");
		}
	}
);
