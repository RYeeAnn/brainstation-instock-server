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
  

module.exports = {
  getAllInventory,
};
