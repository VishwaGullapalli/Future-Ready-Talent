const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DataModel = require("./DataModel");
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/store", async (req, res) => {
  try {
    const dataArray = req.body; // Assuming the JSON array is in the request body

    // Insert the data into the database
    const result = await DataModel.insertMany(dataArray);

    res.status(201).json({ message: "Data saved successfully", data: result });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/fetch", (req, res) => {
  DataModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});