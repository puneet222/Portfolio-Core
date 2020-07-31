import mongoose, { Schema, Document } from 'mongoose';

export interface IInfo extends Document {
    user: string;
    email: string;
    name: string;
    phone: string;
    introduction: string;
    website: string;
    github: string;
    linkedIn: string;
    resume: string;
    date: Date
}

// Declare the Schema of the Mongo model
const InfoSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    introduction: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

//Export the model
export default mongoose.model<IInfo>('Info', InfoSchema);