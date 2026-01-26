// ? Streams Module
// A stream lets you to process data piece by piece, instead of loading everyting into memory

// We use streams for: low memory usage, faster for big files, perfect for servers

// ? Streams ARE events under the hood.

const {createReadStream, createWriteStream} = require('fs');

// ? Readable stream
// It's a source of data, it gives data to your program chunk by chunk (Like a faucet pouring the data);
// 📌 Readable = produces data
const bigFile = createReadStream('./content/big.txt');

// Strams reads data in chuncks
bigFile.on('data', (data) =>{
    console.log(data)
})

// Streams also listening to the errors
bigFile.on('eror', (err) => {console.log(err)});



// ? Writeable stream
// It's a destination for data, it receives data chunk by chunk (Like a bucket for data).
// 📌 Writable = consumes data
const writable = createWriteStream('./content/output.txt');
// writable.write('Hello...');
// writable.write('World');
// writable.end();

// ? Pipe 
// Pipes the data from readable to writable stream
bigFile.pipe(writable);
writable.on('finish', () => {
    console.log('File copy completed!');
})

// Streaming a file to the browser:
const http = require('http');

http.createServer((req, res) => {
  const readable = createReadStream('./content/big.txt');
  readable.pipe(res); // res is writable
}).listen(3000);
