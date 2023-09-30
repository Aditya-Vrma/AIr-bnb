const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
require("dotenv").config();
const app = express();
app.use(express.json());

const bcryptsalt = bcrypt.genSaltSync(10); // we can also added await here but we add Sync in genSalt

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptsalt), //to add encription to our password , we are adding node package called bcrypyjs
    });
  } catch (e) {
    res.status(422).json(e);
  }

  res.json(userDoc);
});

app.listen(4000, () => {
  console.log("Listening on Port 4000....");
});
