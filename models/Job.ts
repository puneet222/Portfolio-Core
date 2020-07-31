import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    user: string;
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    workInfo: string;
    techStack: Array<string>;
    imageLink?: string;
}

// Declare the Schema of the Mongo model
const jobSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    company: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    workInfo: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    }
});

//Export the model
export default mongoose.model<IJob>('Job', jobSchema);