// ? Logger middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleString();
  console.log(`Method: ${method}, Url: ${url}, Time: ${time}`);
  next();
}

module.exports = logger;