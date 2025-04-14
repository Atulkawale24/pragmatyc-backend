const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();
const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;

const dbConnection = async () => {
    try {
        await mongoose.connect(dbUrl, { dbName: dbName });
        console.log("DB Connected successfully 👍");
    } catch (error) {
        console.log("Failed to connect DB");
        process.exit(1);
    }
}

const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error disconnecting from the database 😭:', error.message);
    }
};

module.exports = {
    dbConnection,
    disconnectFromDatabase,
};
