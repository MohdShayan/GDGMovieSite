import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./Connection/connectDB.js";
import movieRoutes from "./routes/movieRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());

app.use("/api/movies", movieRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  ConnectDB();
  console.log("Server Started ! at http://localhost:" + PORT);
});
