const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURI");

export const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}