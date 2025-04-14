const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const { dbConnection } = require("./db/db.config");

dotEnv.config();
const app = express();
const port = process.env.PORT || 3021;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);


app.get("/", (req, res) => {
  res.send("Node project backend is Live 😍");
});

// Handle shutdown gracefully by disconnecting from the database
process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

dbConnection();
app.listen(port, () => {
  console.log(`server is running on ${port} 🏃‍♂️🏃‍♂️`);
});
