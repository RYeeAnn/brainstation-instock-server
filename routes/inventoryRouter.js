const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.route("/").get(inventoryController.getAllInventory);

router
  .route("/:id")
  .get(inventoryController.getSingleInventory)
  .put(inventoryController.updateInventory);

// router
//   .route("/warehouse/:warehouse_id")
//   .get(inventoryController.getInventoriesForWarehouse);

module.exports = router;
