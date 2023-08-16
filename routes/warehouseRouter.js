const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    console.log("Get on warehouse");
    knex("user");
    res.send("Get on warehouse");
  })
  .post((req, res) => {
    console.log("Post on warehouse");
    res.send("Post on warehouse");
  });

router
  .route("/:id")
  .get((req, res) => {
    console.log("Get single warehouse");
    res.send("Get single warehouse");
  })
  .post((req, res) => {
    console.log("Post single warehouse");
    res.send("Post single warehouse");
  });

module.exports = router;
