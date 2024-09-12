const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { router } = require("./router/student.js");

const app = express();
const port = 5001;

const url = "mongodb://localhost:27017/";
const dbName = "studentDB";

let db = null;

// connect to mongoDB
const connectToDb = async () => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log("connect to mongoDb");
  return db;
};

app.use(bodyParser.json()); // Parses incoming requests with JSON payloads.

connectToDb()
  .then((database) => {
    app.use((req, res, next) => {
      req.db = database;
      next();
    });
    // routes
    app.use("/api", router);
  })
  .catch((error) => {
    console.log("failed to connect ot mongoDb", error);
  });

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
