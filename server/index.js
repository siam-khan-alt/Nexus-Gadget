const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;
let itemsCollection;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db("nexusgadget");
    itemsCollection = db.collection("items");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};


app.get("/api/items", async (req, res) => {
  try {
   const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const totalItems = await itemsCollection.countDocuments(query);
    const items = await itemsCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid item ID" });
    }

    const item = await itemsCollection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const itemData = req.body;

    const newItem = {
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await itemsCollection.insertOne(newItem);
    const insertedItem = await itemsCollection.findOne({
      _id: result.insertedId,
    });

    res.status(201).json(insertedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
  });
};

startServer();
module.exports = app;