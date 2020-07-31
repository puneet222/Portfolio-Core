import mongoose, { Schema, Document } from 'mongoose';

export interface IHits extends Document {
    user: string;
    hits: number;
    lastUpdated?: Date;
}

// Declare the Schema of the Mongo model
const hitsSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
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