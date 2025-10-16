import Picture, { IPicture } from '../models/Picture';
import { FilterQuery } from 'mongoose';

export class PictureService {
  static async listPictures(filters: Partial<IPicture>): Promise<IPicture[]> {
    const query: FilterQuery<IPicture> = {};

    const {
      name,
      description,
      year,
      available,
      width,
      height,
      material,
      _id,
      createdAt,
      updatedAt,
    } = filters as any;

    if (_id) query._id = _id as any;
    if (name) query.name = { $regex: String(name), $options: 'i' };
    if (description) query.description = { $regex: String(description), $options: 'i' };
    if (typeof year !== 'undefined') query.year = Number(year);
    if (typeof available !== 'undefined') query.available = available === true || available === 'true';
    if (typeof width !== 'undefined') query.width = Number(width);
    if (typeof height !== 'undefined') query.height = Number(height);
    if (material) query.material = { $regex: String(material), $options: 'i' };
    if (createdAt) query.createdAt = createdAt as any;
    if (updatedAt) query.updatedAt = updatedAt as any;

    return await Picture.find(query).sort({ createdAt: -1 });
  }

  static async addPicture(data: {
    name: string;
    description?: string;
    year: number;
    available?: boolean;
    width: number;
    height: number;
    material: string;
    imgUrl?: string;
  }): Promise<IPicture> {
    const picture = new Picture({
      name: data.name,
      description: data.description ?? '',
      year: data.year,
      available: typeof data.available === 'boolean' ? data.available : true,
      width: data.width,
      height: data.height,
      material: data.material,
      imgUrl: data.imgUrl ?? '',
    });
    await picture.save();
    return picture;
  }

  static async deletePicture(id: string): Promise<IPicture | null> {
    return await Picture.findByIdAndDelete(id);
  }

  static async editPicture(id: string, updateData: Partial<IPicture>): Promise<IPicture | null> {
    // Prevent img binary field edits since we use imgUrl; still allow imgUrl edits
    return await Picture.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }
}


