import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    name: string;
    info: string;
    tech: Array<string>;
    images: Array<string>;
    link: string;
    githubLink: string;
    fromDate: Date;
    toDate: Date;
}

// Declare the Schema of the Mongo model
const projectSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    info: {
        type: String,
        required: true,
    },
    tech: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
    },
    toDate: {
        type: Date,
    }
});

//Export the model
module.exports = mongoose.model<IProject>('Project', projectSchema);