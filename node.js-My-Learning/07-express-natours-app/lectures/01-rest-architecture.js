// ? THE REST ARCHITECTURE


// ? 1. Separate API into logical resources
/* 👉 Resource: Object or representation of something, which
has data associated to it. Any information that can be
named can be a resource.

For example: tours, users, reviews */

// ? 2. Exposed structured, resource-based URLs
// Example: https://www.natours.com/addNewTour 

// ? 3. Use only HTTP methods (verbs). CRUD - Create, Read, Update, Delete.
// 👉 Endpoints should contain only resources(nouns) and use HTTP methods for actions
// ❌ https://www.natours.com/addNewTour - here this is bad endpoint (addNewTour). ✅ use POST method instead to create new tour and /tours endpoint

// ✅ Instead of naming enpoint /getTour we just name it /tours . And then we use HTTP method GET.


// To update we use PUT and PATCH methods
// PUT - client supposed to send entire updated object.
// PATCH - only part of the object that has been changed.


// DELETE - to delete resource


// ? 4. SEND DATA as JSON (usually)



// ? 5. Be stateless
/* 👉 Stateless RESTful API: All state is handled on the client. This means that each
request must contain all the information necessary to process a certain request.
The server should not have to remember previous requests. */

// Examples of state: loggenIn, currentPage, shopping cart, etc. 
// This information should be stored on the client side (e.g., in cookies, local storage) and sent with each request to the server when needed. 