import { Request, Response } from 'express';
import { PictureService } from '../services/pictureService';

export const pictureController = {
  // GET /api/pictures - with filters (all fields except img)
  getPictures: async (req: Request, res: Response): Promise<void> => {
    try {
      const pictures = await PictureService.listPictures(req.query as any);
      res.status(200).json({ success: true, count: pictures.length, data: pictures });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // POST /api/pictures/addPicture
  addPicture: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, year, available, width, height, material, imgUrl } = req.body;

      if (!name || !year || !width || !height || !material) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      const picture = await PictureService.addPicture({
        name,
        description,
        year: Number(year),
        available,
        width: Number(width),
        height: Number(height),
        material,
        imgUrl,
      });

      res.status(201).json({ success: true, data: picture });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to add picture' });
    }
  },

  // DELETE /api/pictures/deletePicture/:id
  deletePicture: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await PictureService.deletePicture(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Picture not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Picture deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // PUT /api/pictures/editPicture/:id
  editPicture: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updated = await PictureService.editPicture(id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Picture not found' });
        return;
      }
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to edit picture' });
    }
  },
};


