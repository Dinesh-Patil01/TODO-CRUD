import express from 'express';
import router from './routes/routes.js';
import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
import { connectToMongoDB } from './data/db.js';
const app = express();
app.use(express.json());
connectToMongoDB();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
})

app.use("/api", router)

 const port = process.env.PORT || 5000
 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });