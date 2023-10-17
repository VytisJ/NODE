const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

// Get All items
app.get("/", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("renginys")
      .collection("dalyviai")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get All Vytis cars
app.get("/vytis", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("renginys")
      .collection("dalyviai")
      .find({ name: "Vytis" })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get specific item by :id
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db("renginys")
      .collection("dalyviai")
      .find(new ObjectId(id)) // pagal id kriteriju
      .toArray();
    await con.close();
    res.send(data[0]); // viena objekta
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get All names by dynamic :name
app.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db("renginys")
      .collection("dalyviai")
      .find({ name })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get names sorted ascending/descending
app.get("/sorted/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const con = await client.connect();
    const data = await con
      .db("renginys")
      .collection("dalyviai")
      .find()
      .sort({ name: type === "asc" ? 1 : -1 })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/", async (req, res) => {
  try {
    const newDalyvis = req.body;
    if (
      !newDalyvis.name ||
      !newDalyvis.surname ||
      !newDalyvis.email ||
      !newDalyvis.age ||
      !newDalyvis.gender
    ) {
      return res.status(400).send({ error: "Missing data" });
    }
    const con = await client.connect();
    const data = await con
      .db("renginys")
      .collection("dalyviai")
      .insertOne(newDalyvis);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
