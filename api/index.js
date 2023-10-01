const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const bcryptsalt = bcrypt.genSaltSync(10); // we can also added await here but we add Sync in genSalt

const jwtSecret = "asfghjkasdfaffdafdsfasdfasdfsdfasl";

//console.log(process.env.MONGO_URL);
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
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    // res.json("found");
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk != null) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );

      res.json("Password correct");
    } else {
      res.status(422).json("Password incorrect");
    }
  } else {
    res.json("Not found");
  }
});

app.listen(4000, () => {
  console.log("Listening on Port 4000....");
});
