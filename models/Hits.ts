import mongoose, { Schema, Document } from 'mongoose';

export interface IHits extends Document {
    hits: number;
    lastUpdated?: Date;
}

// Declare the Schema of the Mongo model
const hitsSchema: Schema = new Schema({
    hits: {
        type: Number,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now(),
    }
});

//Export the model
export default mongoose.model<IHits>('Hits', hitsSchema);