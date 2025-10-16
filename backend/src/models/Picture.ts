import mongoose, { Document, Schema } from 'mongoose';

export interface IPicture extends Document {
  name: string;
  description: string;
  year: number;
  available: boolean;
  width: number;
  height: number;
  material: string;
  imgUrl?: string; // store image location (e.g., URL or path)
  createdAt: Date;
  updatedAt: Date;
}

const pictureSchema = new Schema<IPicture>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    year: { type: Number, required: true },
    available: { type: Boolean, default: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    material: { type: String, required: true, trim: true },
    imgUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IPicture>('Picture', pictureSchema);


