import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    email: string;
    name: string;
    password: string;
}

// Declare the Schema of the Mongo model
const skillSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
module.exports = mongoose.model<ISkill>('Skill', skillSchema);