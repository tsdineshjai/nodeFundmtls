const eventEmitter = require("node:events");

//this events module is purley written in JS, not in c or C++
// events module is not related to the event loop whatsover.

console.log(typeof eventEmitter);

class Events extends eventEmitter {}

//extending the custom class from eventEmitter class

const myEmitter = new Events();

myEmitter.on("fireup", () => {
	console.log(`fireup event was tracked while listening`);
});
//listening to an event "fireup"

myEmitter.emit("fireup")
//firing an event.