import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import router from "./routes/AuthRoute.js";
const app = express();
const port = 4000;
import "dotenv/config";
// req pars to json
app.use(express.json());
// to connect backend to different ports
app.use(cors());

app.use(bodyParser.json());
// db connection importing the database file
connectDB();
// API endpoints
app.use("/auth", router);
// for now we have just mounted the folder uploads at /images end point.
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening at the port ${port}`);
});
