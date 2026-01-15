const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://nexus-gadget-shop.vercel.app" 
    : "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

let db;
let itemsCollection;

const connectDB = async () => {
  if (db) return db;
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

const getCollection = async (req, res, next) => {
  try {
    const database = await connectDB();
    req.itemsCollection = database.collection("items");
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
}; 

app.get("/api/items", getCollection, async (req, res) => {
  try {
   const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const totalItems = await req.itemsCollection.countDocuments(query);
    const items = await req.itemsCollection
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

app.get("/api/items/:id", getCollection, async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid item ID" });
    }

    const item = await req.itemsCollection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

app.post("/api/items", getCollection, async (req, res) => {
  try {
    const itemData = req.body;

    const newItem = {
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await req.itemsCollection.insertOne(newItem);
    const insertedItem = await req.itemsCollection.findOne({
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

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Running on http://localhost:${PORT}`));
  });
}
module.exports = app;