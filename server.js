const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const warehouseRoute = require("./routes/warehouseRouter");
const inventoryRoute = require("./routes/inventoryRouter");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/warehouse", warehouseRoute);
app.use("/inventory", inventoryRoute);

app.listen(port, () => {
  console.log(`Connected at ${port}`);
});
