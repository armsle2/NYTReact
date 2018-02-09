const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use('/', function(req, res) {
  res.sendFile('/Users/flyrebel/bootcamp/homework/NYTReact/client/build/index.html');
});

module.exports = router;
