const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router
  .route("/")
  .get(warehouseController.index)
  .post((req, res) => {
    console.log("Post on warehouse");
    res.send("Post on warehouse");
  });

router
  .route("/:id")
  // .get(warehouseController.getSingleWarehouse)
  // .post((req, res) => {
  //   console.log("Post single warehouse");
  //   res.send("Post single warehouse");
  // })
  .delete(warehouseController.removeWarehouse);

module.exports = router;
