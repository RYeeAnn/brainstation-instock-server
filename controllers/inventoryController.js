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

const getInventoriesForWarehouse = (req, res) => {
  const warehouseId = req.params.warehouse_id;

  knex("inventories")
    .where({ warehouse_id: warehouseId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories for Warehouse: ${err}`)
    );
};

module.exports = {
  getAllInventory,
  getSingleInventory,
  getInventoriesForWarehouse,
};
