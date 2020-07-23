import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
    email: string;
    name: string;
    password: string;
}

// Declare the Schema of the Mongo model
const certificateSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    }
});

//Export the model
module.exports = mongoose.model<ICertificate>('Certificate', certificateSchema);