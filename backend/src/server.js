import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import noteRoutes from './Routes/noteRoutes.js';
import { connectDB } from './config/db.js';

import path from 'path';

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:3000',
    }));
}

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use('/api/notes', noteRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"./frontend/dist")));
}



connectDB().then(()=>{
    app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    });
});

