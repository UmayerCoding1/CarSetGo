import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors  from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
const app = express();
const port = process.env.PORT || 8000;

connectDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: [
      "http://localhost:5173"
    ],   // * means allow from any domain
  credentials: true,
}));


import auhRoute from './routes/auth.route.js';

app.use('/api/v1/auth', auhRoute);


app.listen(port, () => {
    console.log(`Server running port:${port}`);
    
})


