const net = require("node:net");

const readline = require("node:readline");

let myID;

//The readline.createInterface() method creates a new readline.Interface instance.
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const client = net.createConnection(
	{ port: 3542, host: "127.0.0.1" },
	() => {}
);

const ask = () => {
	rl.question("Enter a message > ", (answer) => {
		client.write(`${myID}-${answer}`);
		process.stdout.moveCursor(0, -1, () => {});
		process.stdout.clearLine(0, () => {});
	});
};

client.on("data", (message) => {
	const stringMessage = message.toString("utf-8");
	if (stringMessage.substring(0, 2) === "id") {
		myID = stringMessage.substring(3);
		console.log(`your id is  ${myID}\n`);
	} else {
		console.log(stringMessage);
	}
	ask();
});
