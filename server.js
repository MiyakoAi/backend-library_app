import app from "./src/app.js";
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected and synced successfully.");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log("Hello Sekai!");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();