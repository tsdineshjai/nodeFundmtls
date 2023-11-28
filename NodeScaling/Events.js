const eventsEmitter = require("node:events");

class Events extends eventsEmitter {}
//extendint the class

const EventObject = new Events();
//institiating a class

EventObject.on("hello", () => {
	console.log(`this callback was trigerred`);
});

/* wwhen this function was invoked, the callback gets added to a master object with 
the label of the event 
*/

EventObject.emit("hello");
/* this emits the hello event, there by triggerring the relevant callback associated with this event
in the master object and it doesnt remove the callback function once it is invoked.
*/
