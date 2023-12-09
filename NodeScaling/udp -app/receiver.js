const dgram = require("node:dgram");

// create a UDP socket

const receiver = dgram.createSocket("udp4");

receiver.on("message", (message, remoteInfo) => {
	console.log(
		`Server recieved message : ${message} from ${remoteInfo.address} and 
    family ${remoteInfo.family} from the port ${remoteInfo.port}`
	);
});

receiver.bind({ address: "127.0.0.1", port: 8000 });
//udp server listening to this port and adress

//once binding is succesful, udp socket emits the listening event. its ready to receive the datagram (messages:data)
receiver.on("listening", () => {
	console.log(`listening to`);
	console.log(receiver.address());
});
