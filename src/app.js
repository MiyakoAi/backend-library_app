import express from 'express';
import cors from 'cors';

const app = express();
// tes lontribusi
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
