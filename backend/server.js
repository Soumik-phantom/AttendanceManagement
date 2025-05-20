import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loginUser } from './controller/auth.controller.js';
import { registerUser } from './controller/auth.controller.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URL
mongoose.connect(MONGO_URI)
const db = mongoose.connection

db.on("open", () => {
  console.log("Connected to MongoDB");
})
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);