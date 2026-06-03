// ? Param Middleware in Express
// Param middleware runs automatically when a specific parameter found in the URL. 
// It's used to do something (like validate or find data) before the actual route handler runs.

// ? Basic syntax
router.param('paramName', (req, res, next, value) => {
  // value = the actual value from the URL
  next();
});


// ? Example — Validate User ID
// Validate once, applies to all routes with :id:
// Runs automatically whenever ':id' is in the URL
router.param('id', (req, res, next, value) => {
  const id = parseInt(value);

  if (id > users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  next(); // ← move on to the actual route
});

// Now no validation needed in each route!
router.get('/:id', (req, res) => {
  res.json(users[req.params.id]);
});

router.patch('/:id', (req, res) => {
  res.json({ message: "User updated" });
});