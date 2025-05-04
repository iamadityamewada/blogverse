const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnect } = require("./src/config/db");
const { authRoute } = require("./src/router/auth");
const { blogRouter } = require("./src/router/blog");
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRouter);

app.listen(4000, () => {
  console.log("Server is Running at: http://localhost:4000");
  dbConnect(); 
});
