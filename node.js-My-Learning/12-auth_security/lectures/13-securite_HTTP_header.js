// * Setting up securite HTTP header using helmet

// * 1. Install helmet
// npm i helmet

// * 2. Use helmet middleware in app.js
const helmet = require('helmet');
app.use(helmet());
