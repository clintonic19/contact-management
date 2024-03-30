const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI);
        console.log(`Database connected successfully ${conn.connection.host}, ${conn.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;