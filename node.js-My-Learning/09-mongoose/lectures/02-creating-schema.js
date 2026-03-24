// ? Creating a Schema Model
// Schema defines the structure of documents inside a MongoDB collection.
// It tells MongoDB what fields exist, what type they are, and what rules they follow.

// 1️⃣ Basic Schema Example
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});


// 2️⃣ Creating a Model From the Schema
// Schemas by themselves don’t interact with the database.
// You must create a model:
const User = mongoose.model("User", userSchema);

const newUser = new User({
    name: "Max",
    age: 22,
    email: "max@email.com"
});

await newUser.save();


// 4️⃣ Adding Validation (Very Common)
const userSchemaRules = new mongoose.Schema({
    name: {
        type: String,
        required: true // name must exist
    },
    age: {
        type: Number,
        min: 18 // age minimum 18
    },
    email: {
        type: String,
        required: true,
        unique: true // email should be unique
    },
    createdAt: {
        type: Date,
        default:  Date.now // we can also specify default values
    }
});