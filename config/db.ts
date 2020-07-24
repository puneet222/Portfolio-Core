import mongoose from 'mongoose';
import config from 'config';
const db: string = config.get("mongoURI");

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