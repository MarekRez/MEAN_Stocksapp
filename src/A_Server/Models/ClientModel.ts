import mongoose, { Schema, Document } from "mongoose";
import { IStock } from "./StockModel";
import { ObjectId } from 'mongoose';  // Import ObjectId from mongoose

export interface Client extends Document {
    name: string;
    email: string;
    iban: string;
    bankAccountBalance: number;
    investmentAccountBalance: number;
    stocks: IStock[];

}

// Create the Schema
const ClientSchema: Schema = new Schema({
    name: { type: String, required: true }, // Name is required
    email: { type: String, required: true, unique: true }, // Email must be unique
    iban: { type: String, default: null }, // IBAN generated later
    bankAccountBalance: { type: Number, required: true, default: 0 }, // Default balance is 0
    investmentAccountBalance: { type: Number, required: true, default: 0 }, // Default balance is 0
    stocks: [{ type: Object }]
});

// Create the Model
const ClientModel = mongoose.model<Client>("Client", ClientSchema);

export default ClientModel;
