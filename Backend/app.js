const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnect } = require("./src/config/db");
const { authRoute } = require("./src/router/auth");
const { blogRouter } = require("./src/router/blog");

// It's better practice to connect to the DB *before* starting to listen or exporting
dbConnect();

app.use(cors());
app.use(express.json());

// Define a simple root route for testing
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRouter);

// Remove or comment out app.listen for Vercel
/*
app.listen(4000, () => {
  console.log("Server is Running at: http://localhost:4000");
  // dbConnect(); // Connect earlier
});
*/

// Export the app for Vercel
module.exports = app; // <= Add this line