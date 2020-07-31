import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ICertificate extends Document {
    user: string;
    email: string;
    name: string;
    password: string;
}

// Declare the Schema of the Mongo model
const certificateSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    validTill: {
        type: Date,
    },
    link: {
        type: String,
    },
    imageLink: {
        type: String,
    }
});

//Export the model
export default mongoose.model<ICertificate>('Certificate', certificateSchema);