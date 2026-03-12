// ? Serving Static Files
// means making files like HTML, CSS, images, JavaScript directly accessible via a URL — without needing a route handler for each one.

// To serve:
app.use(express.static('public'));