// ? fs module (File System)
// Used for interacting with the file system
// Used to read, write, update, delete, and stream files on the server.

// Supports sync (blocking), async (callback) (non-blocking), and promise-based APIs

// ? Sync way (blocking)
const { readFileSync, writeFileSync} = require('fs');

// 1. readFileSync - Reads the content of a file (synchronous)
const data = readFileSync('../content/first.txt', 'utf8');
const data2 = readFileSync('../content/second.txt', 'utf8');
console.log(data, data2);

// 2. writeFileSync - Writes data to a file (synchronous)
writeFileSync('../content/fourth.txt', 'This is the fourth file created using writeFileSync');
writeFileSync('../content/third.txt', 'This is the third file created using writeFileSync', { flag: 'a' }); // 'a' flag appends data if file exists
writeFileSync('../content/fourth.txt', 'This file was overwritten using writeFileSync'); // Overwrites existing content

// Note: In real-world applications, prefer using async or promise-based APIs to avoid blocking the event loop.
