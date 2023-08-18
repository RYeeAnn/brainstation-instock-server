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

const getSingleWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send(`No warehouse found with id: ${req.params.id}`);
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving single warehouse: ${err}`);
    });
};

const createWarehouse = (req, res) => {
  knex("warehouses")
    .insert({
      warehouse_name: req.body.warehouse_name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contact_name: req.body.contact_name,
      contact_position: req.body.contact_position,
      contact_phone: req.body.contact_phone,
      contact_email: req.body.contact_email,
    })
    .then(() => {
      res.json({ message: "Warehouse created successfully" });
    })
    .catch((error) => {
      console.error("Error creating warehouse:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the warehouse" });
    });
};

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
  getSingleWarehouse,
  createWarehouse,
  removeWarehouse,
};
