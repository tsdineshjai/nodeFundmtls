const net = require("node:net");

const readline = require("node:readline");

/* 
createConnection for IPC connections. Inter Process Communications !
createConnection for TCP connections.
*/
//establishing a connection.
const client = net.createConnection(
	{ port: 3542, host: "127.0.0.1" },
	(socket) => {
		console.log(`connected to the server`);
	}
);

//The readline.createInterface() method creates a new readline.Interfaceinstance.
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

//asking a question using the readline question method
//signal is passed to abort the question when we dont get a  response within some time
//this is where you can pose questions and wait for answer and callback listens for answer and logs its
rl.question("Enter a message to be sent to client\n ", (answer) => {
	client.write(answer);
});


