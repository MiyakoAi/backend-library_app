import express from 'express';
import cors from 'cors';
import externalBookRoutes from './routes/externalRoutesBooks.js';
import bukuRoutes from './routes/booksRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// External route
app.use('/api', externalBookRoutes);
app.use('/api/books', bukuRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
