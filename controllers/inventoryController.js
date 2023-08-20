const knex = require("knex")(require("../knexfile.js"));

const getAllInventory = (req, res) => {
  knex("warehouses")
    .join("inventories", "warehouses.id", "inventories.warehouse_id")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventory: ${err}`));
};

const getSingleInventory = (req, res) => {
  const inventoryId = req.params.id;

  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .where("inventories.id", inventoryId)
    .first()
    .then((inventory) => {
      if (!inventory) {
        return res
          .status(404)
          .json({ message: `Inventory with ID ${inventoryId} not found` });
      }
      res.status(200).json(inventory);
    })
    .catch((err) =>
      res.status(400).json({ error: `Error retrieving Inventory: ${err}` })
    );
};

// const getInventoriesForWarehouse = (req, res) => {
//   const warehouseId = req.params.warehouse_id;

//   knex("inventories")
//     .where({ warehouse_id: warehouseId })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error retrieving Inventories for Warehouse: ${err}`)
//     );
// };

const createInventory = (req, res) => {
  const valid = true;

  // validation to check for all fields in req.body

  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).json({ error: "All fields should be filled" });
  }

  // validation to accept only numerical values for quantity field

  if (isNaN(req.body.quantity) || req.body.quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity value" });
  }

  // validation to check for warehouse id in warehouses table

  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .then((result) => {
      if (result.length === 0) {
        valid = false;
        return res.status(400).json({
          message: "Warehouse ID value does not exist in the warehouses table",
        });
      } else {
        knex("inventories")
          .insert({
            warehouse_id: req.body.warehouse_id,
            item_name: req.body.item_name,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status,
            quantity: req.body.quantity,
          })
          .then(() => {
            res.status(201).json({ message: "Inventory created successfully" });
          })
          .catch((error) => {
            // console.error("Error creating inventory:", error);
            res.status(400).json({
              error: "An error occurred while creating the inventory",
            });
          });
      }
    });
};

const updateInventory = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => {
      return knex("inventories").where({
        id: req.params.id,
      });
    })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({
          message: `Inventory with ID: ${req.params.id} to be updated not found.`,
        });
      }
      res.status(200).json(result[0]);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to update inventory with ID: ${req.params.id}`,
      });
    });
};

const deleteInventory = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({
          message: `Inventory with ID: ${req.params.id} to be deleted not found.`,
        });
      }
      // no content response
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete inventory" });
    });
};

module.exports = {
  getAllInventory,
  getSingleInventory,
  // getInventoriesForWarehouse,
  createInventory,
  updateInventory,
  deleteInventory,
};
