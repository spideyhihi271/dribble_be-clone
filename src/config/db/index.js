const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = `mongodb+srv://nguyenlt2713:${process.env.DB_PASSWORD}@cluster0.d3d0wi2.mongodb.net/`;

let connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Database connection has been complete!');
    } catch (error) {
        console.log(error);
        console.log('Failed to connection database!!!');
    }
}
module.exports = { connectDB }