import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

async function connect() {
  try {
    const res = await mongoose.connect(
      "mongodb+srv://abhishekpanwarrr:abhishekpanwarrr@cluster0.5p3hyz0.mongodb.net/blog?retryWrites=true&w=majority"
    );
    console.log("Res", res.connection.host);
  } catch (error) {
    console.log("Error connecting to Mongo", error.message);
  }
}

connect();
const app = express();
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}));
app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, firstName, lastName, password, company, phone } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  console.log("hashedPassword", hashedPassword);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).send("User already exists");
    }
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      phone,
      company,
      password: hashedPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(404).send("User didn't exists");
    }
    // Compare password
    const isMatch = await bcryptjs.compare(password, userExists.password);
    // console.log("isMatch", isMatch);
    if (!isMatch) {
      res.status(400).send("Invalid password");
    }
    jwt.sign({ id: userExists._id }, "secretpassword", {}, (err, token) => {
      if (err) throw new err();
      res.cookie("token", token).status(200).send("ok");
    });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});
app.listen("8000");
