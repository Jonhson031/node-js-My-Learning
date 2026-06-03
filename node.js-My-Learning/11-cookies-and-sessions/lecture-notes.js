// ? Understanding Authentication in Node.js (Sessions & Cookies)
// When user log in, we need the way to remember that user is logged in for future requests.
// Because HTTP is stateless, meaning that each request is independent and server doesn't remember previous interactions.
// * To solve this, we use sessions and cookies.

// ? What is a cookie?
// * A cookie is a small piece of data stored in the user’s browser.
// * It can store user preferences, login status, and other information.
// ! Problem with it: cookie can be modified by a user, so sensitive date like id can be changed by a user and user can pretend to be someone else!
// That is why we also use sessions.

// ? Sessions (Server-side storage)
// * A session stores user data on the server, not in the browser.
// Instead of storing user info in the cookie, we store ONLY a session id.

// ? 🔄 How Sessions Work (Step-by-step)

// 1) User logs in
// Server creates a session:
req.session.user = { id: 123, name: "Maksym" };

// 2) Server sends cookie with session ID
// Set-Cookie: connect.sid=abc123

// 3) Browser stores that cookie
// 4) Next request
// Cookie: connect.sid=abc123

// 5. Server uses ID to find session
// Server loooks up: 
sessionStore["abc123"] > { user: { id: 123, name: "Maksym" } }

/* ✅ Why sessions are secure
User cannot see or modify actual data
Only sees random session ID
Data stays on server */