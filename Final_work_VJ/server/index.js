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
const dalyviaiCollection = client.db("renginys").collection("dalyviai");
const registeredUsers = [];

// Register a user
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Missing data" });
  }

  // Simulate registration by adding the user to the local array
  const newUser = { email, password };
  registeredUsers.push(newUser);

  res.status(201).send({ message: "User registered successfully" });
});

app.get("/", async (req, res) => {
  try {
    const data = await dalyviaiCollection.find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/male", async (req, res) => {
  try {
    const data = await dalyviaiCollection.find({ gender: "male" }).toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/female", async (req, res) => {
  try {
    const data = await dalyviaiCollection.find({ gender: "female" }).toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await dalyviaiCollection.find(new ObjectId(id)).toArray();
    res.send(data[0]);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const data = await dalyviaiCollection.find({ name }).toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/sorted/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const data = await dalyviaiCollection
      .find()
      .sort({ name: type === "asc" ? 1 : -1 })
      .toArray();
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
    const data = await dalyviaiCollection.insertOne(newDalyvis);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/dalyviai/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await dalyviaiCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount > 0) {
      res.send({ message: "Record deleted successfully" });
    } else {
      res.status(404).send({ error: "Record not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
