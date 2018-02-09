const router = require("express").Router();
const articlesController = require("../../controllers/articlescontroller");

// get saved articles and save a new article
router
  .route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

// Delete saved article 
router
  .route("/:id")
  .delete(articlesController.remove);

module.exports = router;
