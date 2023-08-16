const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    console.log("Get on warehouse");
    res.send("Get on warehouse");
  })
  .post((req, res) => {
    console.log("Post on warehouse");
    res.send("Post on warehouse");
  });

module.exports = router;
