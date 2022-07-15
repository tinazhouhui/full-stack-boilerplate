import express from 'express';
import router from './router.js';
import cors from 'cors'
import {connectDB} from './models/index.js';


const app = express();

app.use(cors())
app.use(express.json()); // json body parser
app.use(router); // apply router

try {
    await connectDB();
} catch (err) {
    console.error(err.stack);
}

export default app;
