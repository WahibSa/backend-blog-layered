import express from "express";
import dotenv from "dotenv";
import dbConnection from "../config/db.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

dotenv.config();
const PORT = process.env.PORT || 3000;

await dbConnection();

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
