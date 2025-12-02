import express from 'express';
import routes from './routes/index'
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors({
    origin:  process.env.FRONTEND_URL || '*'
}));
app.use('/api', routes)

app.use(errorHandler); // Middleware global de manejo de errores

export default app;