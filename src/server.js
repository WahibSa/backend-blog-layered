import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.static("public"));

dotenv.config();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
