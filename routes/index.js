const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.resolve(path.join('build', "index.html"));
// });

// function* index() {
//   this.body = fs.readFileSync(path.resolve(path.join('build', 'index.html')), 'utf8')
// } m

// router.get('*', index)

module.exports = router;
