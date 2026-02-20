const http = require('http');
const server = http.createServer((req, res) =>{
    res.writeHead(200, {'content-type': 'text/html' });
    res.end('<h1>Home Page</h1>')
})

const PORT = 5000;

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})


// IP address = the building 🏢
// Port = the apartment number 🚪

// ? Well-known ports (0-1023) :
// 80 - HTTP
// 443 - HTTPS
// 22 - SSH
// 21 - FTP
// 25 - SMTP 

// ? Registered ports (1024–49151)
// 3000 - Node/Express dev
// 3306 - MySQL
// 5432 - PostgreSQL
// 27017 - MongoDB

