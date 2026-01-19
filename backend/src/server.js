import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import noteRoutes from './Routes/noteRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use((req,res,next) => {
    console.log("New request received: ", req.method, req.url);
    next();
})

app.use('/api/notes', noteRoutes)


connectDB().then(()=>{
    app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    });
});

