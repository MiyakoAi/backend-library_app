import express from 'express';
import cors from 'cors';
import externalBookRoutes from './routes/externalRoutesBooks.js';
import bukuRoutes from './routes/booksRoutes.js';
import mahasiswaRoutes from './routes/mahasiswaRoutes.js';

const app = express();
// tes lontribusi
app.use(cors());
app.use(express.json());

// External route
app.use('/api', externalBookRoutes);
app.use('/api/books', bukuRoutes);
app.use('/api/mahasiswa', mahasiswaRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
