// ? Connect database to Express

// * Step 1:  Install driver
// npm install mongodb 
// npm install mongoose

// * Step 2: Connecting with link
// mongodb+srv://jonhson228124_db_user:<PASSWORD>@cluster0.9xidofz.mongodb.net/?appName=Cluster0 // we need to specify name of database in the end 
// MongoDB will automatically create the database if it doesn't exist.

import mongoose from "mongoose";

mongoose.connect('use link');

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
