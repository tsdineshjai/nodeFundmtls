import WebSocket from "ws";

var ws = new WebSocket("ws://localhost:8080");

ws.onopen = function () {
	ws.send("master");
	ws.send("blaster");
	ws.send("blaster");
	ws.send("pickup");
	ws.send("master");
};

ws.onmessage = function (evt) {
	console.log(evt.data);
};
