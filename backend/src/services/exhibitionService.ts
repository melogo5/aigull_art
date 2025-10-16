import Exhibition, { IExhibition } from '../models/Exhibition';
import { FilterQuery, Types } from 'mongoose';

export class ExhibitionService {
  static async listExhibitions(filters: Partial<IExhibition>): Promise<IExhibition[]> {
    const query: FilterQuery<IExhibition> = {};

    const {
      name,
      description,
      startDate,
      endDate,
      location,
      passed,
      pictures,
      _id,
    } = filters as any;

    if (_id) query._id = _id as any;
    if (name) query.name = { $regex: String(name), $options: 'i' };
    if (description) query.description = { $regex: String(description), $options: 'i' };
    if (startDate) query.startDate = { $gte: new Date(startDate) } as any;
    if (endDate) query.endDate = { ...(query.endDate as any), $lte: new Date(endDate) } as any;
    if (location) query.location = { $regex: String(location), $options: 'i' };
    if (typeof passed !== 'undefined') query.passed = passed === true || passed === 'true';
    if (pictures) {
      const ids = Array.isArray(pictures) ? pictures : String(pictures).split(',');
      query.pictures = { $in: ids.filter(Boolean).map((id: string) => new Types.ObjectId(id)) } as any;
    }

    return await Exhibition.find(query).populate('pictures').sort({ startDate: -1 });
  }

  static async addExhibition(data: {
    name: string;
    description?: string;
    startDate: Date | string;
    endDate: Date | string;
    location: string;
    pictures?: string[];
    passed?: boolean;
  }): Promise<IExhibition> {
    const exhibition = new Exhibition({
      name: data.name,
      description: data.description ?? '',
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      location: data.location,
      pictures: (data.pictures ?? []).map((id) => new Types.ObjectId(id)),
      passed: typeof data.passed === 'boolean' ? data.passed : false,
    });
    await exhibition.save();
    return exhibition;
  }

  static async deleteExhibition(id: string): Promise<IExhibition | null> {
    return await Exhibition.findByIdAndDelete(id);
  }

  static async editExhibition(id: string, updateData: Partial<IExhibition>): Promise<IExhibition | null> {
    if ((updateData as any).startDate) (updateData as any).startDate = new Date((updateData as any).startDate as any);
    if ((updateData as any).endDate) (updateData as any).endDate = new Date((updateData as any).endDate as any);
    if ((updateData as any).pictures) {
      (updateData as any).pictures = (updateData as any).pictures.map((id: string) => new Types.ObjectId(id));
    }
    return await Exhibition.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }
}


