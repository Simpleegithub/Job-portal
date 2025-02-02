import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/Dbconnection.js';
import './config/instrument.js';
import * as Sentry from '@sentry/node'; 
import {ClerkWebHooks} from './controllers/WebhooksController.js';

dotenv.config();



const app=express();
Sentry.setupExpressErrorHandler(app);



// Middlewares
app.use(cors())
app.use(express.json());

// Db connection

 connectDB();



// Routes

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.get("/", (req, res)=>{
    res.send("Server is running")
})

app.post("/webhooks",ClerkWebHooks);
  


const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})