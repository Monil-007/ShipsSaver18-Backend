const mongoose = require('mongoose');
require('dotenv').config();

const connection_url = process.env.DB_URL;
console.log(connection_url)

const connectDB = () => {
    console.log("Database connected succesfully")
    return mongoose.connect(connection_url);
}

module.exports = connectDB;
