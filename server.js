// server.js
import app from './src/app.js';
import sequelize from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database terkonek');

    await sequelize.sync();
    console.log('models tersingkronisasi.');

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('tidak dapat menyambungkan ke database:', error.message);
    process.exit(1);
  }
};

startServer();
