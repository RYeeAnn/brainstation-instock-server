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

module.exports = {
  index,
  // getSingleWarehouse,
};
