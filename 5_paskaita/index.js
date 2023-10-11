const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // nurodom, kad bendraujam json formatu

const port = 3000;

app.get("/", (req, res) => {
  res.send("It works");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
