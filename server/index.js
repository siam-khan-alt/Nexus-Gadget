const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;
let itemsCollection;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db('nexusgadget');
    itemsCollection = db.collection('items');
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
  });
};

startServer();