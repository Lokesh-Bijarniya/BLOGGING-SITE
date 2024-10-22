import express from 'express';
import mongoose from "mongoose";
import authorRouter from './routers/authorRouter.js';
import dotenv from 'dotenv';


const app = express();

app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=> console.log("Database connected successfully")).catch(err => console.error(err));

app.use('/authors', authorRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})
