// ? http module
// Let's to create a web server, handle requests (Urls, methods, headers), send responses (HTML, JSON, text)
// Handle different HTTP methods (GET, POST, PUT, DELETE, etc.)

const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to our home page');
        return;
    }
    if (req.url === '/about') {
        res.end('Here is about page');
        return;
    }
    res.end(
        `<h1>Opps!</h1>
        <p>We can't find a page you are looking for</p>
        <a href='/'>back home</a>`
    )
})

// Define the port to listen on const PORT = 3000;
const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})

