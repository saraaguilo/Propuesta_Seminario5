import mongoose, { Document, Schema } from 'mongoose';

export interface IStore {
    name: string;
    owner: string;
    products: string;
}

export interface IStoreModel extends IStore, Document {}

const StoreSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        owner: { type: String, required: true },
        products: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IStoreModel>('Store', StoreSchema);
