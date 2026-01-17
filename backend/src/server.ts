import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cricketRoutes from './routes/cricket';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Cricket Live API - Server Running ✅' });
});

app.use('/api/cricket', cricketRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});