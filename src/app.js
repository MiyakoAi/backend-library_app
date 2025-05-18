import express from 'express';
import cors from 'cors';
import externalBookRoutes from './routes/externalRoutesBooks.js';
import bookRoutes from './routes/booksRoutes.js';
import mahasiswaRoutes from './routes/mahasiswaRoutes.js';
import authRoutes from './routes/authRoutes.js';
import staffRoute from "./routes/staffRoute.js";
import peminjamanRoute from "./routes/peminjamanRoute.js";
import pengembalianRoute from "./routes/pengembalianRoutes.js";
import mahasiswaRoute from "./routes/pinjamanMahasiswaRoute.js";

const app = express();
// tes lontribusi
app.use(cors());
app.use(express.json());

// External route
app.use('/api/auth', authRoutes); // autentication
app.use('/api/ISBN', externalBookRoutes); // pencarian buku berdasarkan nomor ISBN
app.use('/api/books', bookRoutes); // book API
app.use("/api/staff", staffRoute); // staff API
app.use('/api/mahasiswa', mahasiswaRoutes); // mahasiswa API
app.use("/api", peminjamanRoute); // peminjaman API
app.use("/api", pengembalianRoute); // pengembalian API
app.use("/api", mahasiswaRoute); // mahasiswa pinjaman API


app.get('/', (req, res) => {
  res.send('Hello Sekai!');
});

export default app;
