const express = require('express');
const app = express();
const path = require('path');

// Set up static and middleware
app.use(express.static(path.join(__dirname, 'navbar-app')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'navbar-app', 'index.html')) // transefrs the file into given path
//   Adding to static assests
//   SSR
// })

app.get('/about.html', (req, res) => {
  res.send(`<h1>This is About page</h1>`);
})

app.use((req, res) => {
  res.status(404).send('404. Resource not found!');
})


// We can also check for 404 using app.all()
/* // 🔹 404 page (MUST be last)
app.all('*', (req, res) => {
  res.status(404).send('<h1>page not found</h1>')
}) */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})