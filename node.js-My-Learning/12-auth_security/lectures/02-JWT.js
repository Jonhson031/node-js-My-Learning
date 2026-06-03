// * How authentication works with JWT

// 1. Post /login with email and password
// 2. Check if email and password are correct, if so, sign a token with user id and secret key
// 3. Send token to client
// 4. Client stores the token in local storage or cookie
// 5. Client sends the token in the header of the request to access protected routes
// 6. Server verifies the token and grants access to protected routes if token is valid

// ? JWT_SECRET
// Should be at least 32 characters long and 256 bit
JWT_SECRET = jMydnjH4FisoTTFJbZy1kzCVCWLYVB8HSKbpg1Kv5c2;
// JWT_EXPIRES_IN=90d

// * Creating JWT token
// First we specify id, then JWT secret that we created in config.env, and then when token expires
const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

