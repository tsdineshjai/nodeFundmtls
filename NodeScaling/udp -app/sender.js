const dgram = require("node:dgram");

const sender = dgram.createSocket("udp4");

sender.send("I am gonna do this", "8000", "127.0.0.1", (err, bytes) => {
	if (!err) {
		console.log(`message was succesfully delivered`);
	}
});
