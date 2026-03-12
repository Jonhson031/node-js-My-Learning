// ? MongoDB
// * NoSQL database
// * Instead of tables and rows (like SQL), it stores data as documents in collections.

// BSON
// Data format that MongoDB uses for data storage. Like JSON, but typed.


// Step 1. Creating Local MongoDB Database
// - Install MongoDB Community Server from the official website.
// - mongod.exe to start the MongoDB server (mongod).
// - mongosh to use MongoDB Shell (mongo) to interact with the database.

// To create new local database, simply use the command 'use' <database_name> in the power shell.
// If there is no already database with this name, it will create a new one and swtich to it.

db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7 }) // - to create single new document
db.tours.insertMany([{ name: "The Sea Exploler", price: 497, rating: 4.8 }, { name: "The Snow Adventure", price: 997, rating: 4.9, difficulty: "ease" }]); // to create many documents at the same time


/* Numbers types:
- Integers → Int32
- Large numbers → Int64
- Decimals → Double
- Money → Decimal128 */