import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
}

// Declare the Schema of the Mongo model
const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
});

//Export the model
export default mongoose.model<IUser>('User', userSchema);