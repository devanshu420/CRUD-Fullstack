import express from 'express';
import contentRoutes from './routes/content.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/" , contentRoutes);



export default app