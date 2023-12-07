const net = require("node:net");

const readline = require("node:readline");

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
		process.stdout.moveCursor(0, -1, () => {});
		process.stdout.clearLine(0, () => {});
		client.write(answer);
	});
};

ask();

client.on("data", (message) => {
	console.log(message.toString("utf-8"));
	ask();
});
