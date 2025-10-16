import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IExhibition extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  pictures: Types.ObjectId[]; // references to Picture
  passed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const exhibitionSchema = new Schema<IExhibition>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    pictures: [{ type: Schema.Types.ObjectId, ref: 'Picture', default: [] }],
    passed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IExhibition>('Exhibition', exhibitionSchema);


