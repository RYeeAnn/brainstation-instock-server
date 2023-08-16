const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5050;


app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    console.log("Made it to the server!!");
    res.send("Welcome to the server!!");
});

app.listen(PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})
