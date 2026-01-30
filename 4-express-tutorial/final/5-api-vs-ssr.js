// ? API vs SSR (Server-Side rendering)
// SSR - Server sends ready-made HTML
/* Used for
  - Blogs
  - Marketing sites
  - Dashboards
  - SEO-heavy pages */

// API - backend only. sends JSON data to browser. And then you can use this data in front end to render website



const express = require('express');
const app = express();
const { products, people } = require('./data.js');

app.get('/', (req, res) => {
  // res.json(products); // To send JSON data
  res.send(`<h1>Home Page</h1> <a href="/api/products">Products</a> <a href="/api/products/1">Product 1</a> <a href="/api/products/2">Product 2</a>`);
})
app.get('/api/products', (req, res) => {
  const productsPreview = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  })
  res.json(productsPreview);
})
// app.get('/api/products/1', (req, res) => {
//   res.json(products.filter(product => product.id === 1));
// })

// ? Route parameter
app.get('/api/products/:productID', (req, res) => {
  console.log(req.params);
  const { productID } = req.params;
  if (Number(productID) > products.length) {
    return res.status(404).send('<h1>Product not found!</h1>');
  }
  res.json(products.find(product => product.id === Number(productID)));
})


// ? Using the Query string
// The query string is the part of a URL after the ?.
// It contains key-value pairs that you can use to filter, search, or customize the response.
app.get('/products', (req, res) => {
  const { maxPrice, name } = req.query;
  let searchedProducts = [...products]
  if (maxPrice) {
    searchedProducts = products.filter(product => product.price <= Number(maxPrice));
  }
  if (name) {
    searchedProducts = products.filter(product => product.name.startsWith(String(name)));
  }
  if(maxPrice && name){
    searchedProducts = products.filter(product => product.price <= Number(maxPrice) && product.name.startsWith(String(name)));
  }
  if(searchedProducts.length < 1){
    return res.status(200).json({success: true, data: []});
  }
  
  return res.status(200).json(searchedProducts);
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
