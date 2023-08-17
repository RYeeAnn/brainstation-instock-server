const knex = require("knex")(require("../knexfile.js"));

const index = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

// const getSingleWarehouse = (req, res) => {
//   knex("warehouses")
//     .where({ id: req.params.id })
//     .then((data) => {
//       if (data.length === 0) {
//         res.status(404).send(`No warehouse found with id: ${req.params.id}`);
//       } else {
//         res.status(200).json(data);
//       }
//     })
//     .catch((err) => {
//       res.status(400).send(`Error retrieving single warehouse: ${err}`);
//     });
// };

const removeWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Warehouse with ID: ${req.params.id} to be deleted not found.`,
        });
      }
      // no content response
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete warehouse" });
    });
};

module.exports = {
  index,
  // getSingleWarehouse,
  removeWarehouse,
};
