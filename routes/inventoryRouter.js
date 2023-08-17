const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router
  .route("/")
  .get(inventoryController.getAllInventory)
  .post((req, res) => {
    console.log("Post on inventory");
    res.send("Post on inventory");
  });

  router.get("/", inventoryController.getAllInventory);


module.exports = router;
