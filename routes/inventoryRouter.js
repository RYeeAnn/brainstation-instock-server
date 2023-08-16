const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    console.log("Get on inventory");
    res.send("Get on inventory");
  })
  .post((req, res) => {
    console.log("Post on inventory");
    res.send("Post on inventory");
  });

module.exports = router;
