const fs = require('fs');
const http = require('http');
const path = require('path');

const replaceTemplate = function (template, product) {
    let output = template
        .replaceAll("{%IMAGE%}", product.image)
        .replaceAll("{%PRODUCT_NAME%}", product.productName)
        .replaceAll("{%QUANTITY%}", product.quantity)
        .replaceAll("{%PRICE%}", product.price)
        .replaceAll("{%FROM%}", product.from)
        .replaceAll("{%NUTRIENTS%}", product.nutrients)
        .replaceAll("{%DESCRIPTION%}", product.description)
        .replaceAll("{%ID%}", product.id);

    if (!product.organic)
        output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");

    return output;
};

const tempOverview = fs.readFileSync(path.join(__dirname, 'templates', 'overview.html'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, 'dev-data', 'data.json'), 'utf-8');
const product = fs.readFileSync(path.join(__dirname, 'templates', 'product.html'), 'utf-8');
const tempCard = fs.readFileSync(path.join(__dirname, 'templates', 'template-card.html'), 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { URL } = require('url');

    const myUrl = new URL(req.url, `http://${req.headers.host}`);

    const pathname = myUrl.pathname;
    const query = Object.fromEntries(myUrl.searchParams);


    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{&PRODUCTCARD%}', cardsHTML);

        res.end(output);
        return;
    }

    // Product page
    if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const productObj = dataObj.find(el => el.id === +query.id);
        const productHTML = replaceTemplate(product, productObj);

        res.end(productHTML);
        return;
    }

    // API
    if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data);
        return;
    }

    // Not found
    res.end(
        `<h1>Opps!</h1>
        <p>We can't find a page you are looking for</p>
        <a href='/'>Back home</a>`
    )
})

// Define the port to listen on const PORT = 3000;
const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})
