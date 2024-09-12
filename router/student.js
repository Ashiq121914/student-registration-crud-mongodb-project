const express = require("express");

const router = express.Router();

// create student
router.post("/create", async (req, res) => {
  const db = req.db;
  const reqBody = req.body;
  try {
    const result = await db.collection("students").insertOne(reqBody);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// data get all routes
router.get("/get", async (req, res) => {
  const db = req.db;

  try {
    const result = await db.collection("students").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  router,
};
