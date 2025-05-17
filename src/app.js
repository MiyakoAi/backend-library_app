import express from 'express';
import cors from 'cors';
import externalBookRoutes from './routes/externalRoutesBooks.js';
import bookRoutes from './routes/booksRoutes.js';
import mahasiswaRoutes from './routes/mahasiswaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import staffRoute from "./routes/staffRoute.js";
import peminjamanRoute from "./routes/peminjamanRoute.js";

const app = express();
// tes lontribusi
app.use(cors());
app.use(express.json());

// External route
app.use('/api/auth', authRoutes);
app.use('/api/ISBN', externalBookRoutes);
app.use('/api/books', bookRoutes);
app.use("/api/staff", staffRoute);
app.use('/api/mahasiswa', mahasiswaRoutes);
app.use("/api/peminjaman", peminjamanRoute);


app.get('/', (req, res) => {
  res.send('Hello Sekai!');
});

export default app;
