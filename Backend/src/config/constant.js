require("dotenv").config();

TOKEN_URL = process.env.TOKEN_SECRET;

const uniqueKey = TOKEN_URL;

module.exports = {uniqueKey}