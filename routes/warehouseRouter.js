const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.createWarehouse);

router
  .route("/:id")
  .get(warehouseController.getSingleWarehouse)
  // .post((req, res) => {
  //   console.log("Post single warehouse");
  //   res.send("Post single warehouse");
  // })
  .put(warehouseController.updateWarehouse)

  .delete(warehouseController.removeWarehouse);

module.exports = router;
