const knex = require("knex")(require("../knexfile.js"));

const getAllInventory = (req, res) => {
    knex("inventories")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving Inventory: ${err}`)
      );
  };

  const getSingleInventory = (req, res) => {
    const inventoryId = req.params.id;
  
    knex("inventories")
      .where("id", inventoryId)
      .first()
      .then((inventory) => {
        if (!inventory) {
          return res.status(404).json({ message: `Inventory with ID ${inventoryId} not found` });
        }
        res.status(200).json(inventory);
      })
      .catch((err) => res.status(400).json({ error: `Error retrieving Inventory: ${err}` }));
  };
  
  module.exports = {
    getAllInventory,
    getSingleInventory,
  };
  
