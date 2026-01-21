// ? Event Loop
// Is what allows Node.JS to perform async (non-blocking) I/O (input/output) operations
// Event Loop in Node.JS works almost the same as ASYNC code in Vanilla JS

/* Node JS execution:
1. Sync code runs first
2. nextTick
3. Then microtasks like Promises and async/await are executed.
4. After that, the event loop processes macrotasks such as timers and I/O callbacks from fs and http.
*/

// Example: 
console.log('1. Start');

// Next tick queue
process.nextTick(() => console.log('2. Next tick'));

// Microtask queue (Promise)
Promise.resolve().then(() => console.log('3. Promise'));

// Timer phase
setTimeout(() => console.log('4. Timeout'), 0);

// Check phase
setImmediate(() => console.log('5. Immediate'));

console.log('6. End');
