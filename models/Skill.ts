import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    user: string;
    name: string;
    proficiency: number;
    imageLink: string;
}

// Declare the Schema of the Mongo model
const skillSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    proficiency: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    }
});

//Export the model
export default mongoose.model<ISkill>('Skill', skillSchema);