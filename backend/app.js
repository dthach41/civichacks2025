import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoutes from "./src/routes/auth-routes.js";
import UserRoutes from "./src/routes/user-routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("Server get req");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  // console.log(process.env.DATABASE_URL);
});
