import mongoose, { Schema, Document } from 'mongoose';

export interface IStock extends Document {
    symbol: string;
    stockPrice: number;
    totalShares: number;
}

const StockSchema: Schema = new Schema({
    symbol: { type: String, required: true },
    stockPrice: { type: Number, required: true },
    totalShares: { type: Number, required: true }
});

const StockModel = mongoose.model<IStock>('Stock', StockSchema);
export default StockModel;
