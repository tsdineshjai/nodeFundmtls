Promise.resolve().then(() => {
	console.log(`Promise callacks are part of microtasks and inside microTasks it has second priority and the
	 first priority goes to nextTick callbacks which are exclusive to node run time `);
});
//this gets exucted second

process.nextTick(() => {
	console.log(`i get the first priority in microTasks queue `);
});
//this gets excuted first.

setInterval(() => {
	console.log(`i get excuted after a interval of 6 seconds`);
}, 3000);

setTimeout(() => {
	console.log(`after the microTask queues, timer CB's gets the next priority`);
}, 3000);
//and then the timerMethods

/* among the timer callbacks, priority is for order of functions exeucted. */

setImmediate(() => {
	console.log(`setImmediate are the callbacks part of the check queue and it is in priority
  after the microtTasks, timerqueu, I/O`);
});
//the last one to get called

process.nextTick(() => {
	console.log(`i get the first priority in microTasks queue `);
});
//this gets excuted first.

setTimeout(() => {
	console.log(`after the microTask queues, timer CB's gets the next priority`);
}, 0);
//and then the timerMethods
