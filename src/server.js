import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { errors } from 'celebrate';

const PORT = process.env.PORT ?? 3000;

const app = express();
await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
