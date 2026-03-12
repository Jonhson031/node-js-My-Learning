// ? Environment Variables
// Environment variables are variables stored outside your code that your app can read. 
// They hold sensitive or configuration info like API keys, passwords, database URLs, port numbers.

// Why use them?
// ❌ Bad - hardcoded secrets in your code
const dbPassword1 = "mySecretPassword123";
const apiKey1 = "pk.eyJ1Ijoxxxxxxxxxxxxxxx";

// ✅ Good - stored in environment variables
const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.MAPBOX_TOKEN;


// .env File Setup
// Step 1. npm install dotenv

// Step 2 — Create `.env` file
PORT=3000
NODE_ENV=development
DB_PASSWORD=mySecretPassword123
MAPBOX_TOKEN=pk.eyJ1Ijoxxxxxxxxxxxxxxx

// Step 3 — Load it in your app
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // load FIRST before anything else

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;   // use env variable
app.listen(port);