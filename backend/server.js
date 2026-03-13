import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import router from './routes/AuthRoute.js'
const app = express();
const port = 4000;
import 'dotenv/config'
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
// db connection importing the database file
connectDB();
// API endpoints
app.use('/auth',router);
app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Listening at the port ${port}`);
})
