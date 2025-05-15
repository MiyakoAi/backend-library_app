// server.js
import app from './src/app.js';
import sequelize from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database terkonek');

    await sequelize.sync();
    console.log('models tersingkronisasi.');

    app.listen(PORT, () => {
      
      let count = 0;
      const interval = setInterval(() => {
        count = (count % 5) + 1;
        const dots = '.'.repeat(count);
        process.stdout.write(`\rLoading${dots}   `);
      }, 500);
      setTimeout(() => {
        clearInterval(interval);
        console.log(`\rServer is running at http://localhost:${PORT}\n`);
        process.stdout.write("\rHello Sekai! >_<     \n");
      }, 5000);

    });

  } catch (error) {
    console.error('tidak dapat menyambungkan ke database:', error.message);
    process.exit(1);
  }
};

startServer();
