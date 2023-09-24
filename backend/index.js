import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js";
import bcryptjs from "bcryptjs";

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
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { email, firstName, lastName, password, company, phone } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  console.log("hashedPassword", hashedPassword);
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
});
app.listen("8000");
