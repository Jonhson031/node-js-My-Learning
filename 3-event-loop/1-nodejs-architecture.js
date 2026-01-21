// ? Node JS Architecture
/* 
1. Client Request Phase
    - Clients send requests to the Node.js server
    - Each request is added to the Event Queue

2. Event Loop Phase
    - The Event Loop continuously checks the Event Queue
    - Picks up requests one by one in a loop

3. Request Processing
    -Simple (non-blocking) tasks are handled immediately by the main thread
    - Complex/blocking tasks are offloaded to the Thread Pool

4. Response Phase
    - When blocking tasks complete, their callbacks are placed in the Callback Queue
    - Event Loop processes callbacks and sends responses */

// Blocking code example
const fs = require('fs');

console.log('Start of blocking code');
const data = fs.readFileSync('myfile.txt', 'utf8'); // Blocks here
console.log('Blocking operation completed');

// Non-blocking code example
console.log('Start of non-blocking code');
fs.readFile('myfile.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Non-blocking operation completed');
});
console.log('This runs before the file is read');