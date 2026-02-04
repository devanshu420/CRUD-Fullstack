import express from 'express';
import contentRoutes from './routes/content.routes.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))


app.use("/" , contentRoutes);



export default app