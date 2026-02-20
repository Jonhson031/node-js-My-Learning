// ENOENT: No such file or directory
const fs = require('fs');
fs.readFile('nonexistent.txt', (err) => {
  console.error(err.code); // 'ENOENT'
});

// ECONNREFUSED: Connection refused
const http = require('http');
const req = http.get('http://nonexistent-site.com', (res) => {});
req.on('error', (err) => {
  console.error(err.code); // 'ECONNREFUSED' or 'ENOTFOUND'
});

