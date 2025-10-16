import { Request, Response } from 'express';
import { ExhibitionService } from '../services/exhibitionService';

export const exhibitionController = {
  // GET /api/exhibitions
  getExhibitions: async (req: Request, res: Response): Promise<void> => {
    try {
      const exhibitions = await ExhibitionService.listExhibitions(req.query as any);
      res.status(200).json({ success: true, count: exhibitions.length, data: exhibitions });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // POST /api/exhibitions/addExhibition
  addExhibition: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, startDate, endDate, location, pictures, passed } = req.body;

      if (!name || !startDate || !endDate || !location) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      const exhibition = await ExhibitionService.addExhibition({
        name,
        description,
        startDate,
        endDate,
        location,
        pictures,
        passed,
      });

      res.status(201).json({ success: true, data: exhibition });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to add exhibition' });
    }
  },

  // DELETE /api/exhibitions/deleteExhibition/:id
  deleteExhibition: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await ExhibitionService.deleteExhibition(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Exhibition not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Exhibition deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // PUT /api/exhibitions/editExhibition/:id
  editExhibition: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updated = await ExhibitionService.editExhibition(id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Exhibition not found' });
        return;
      }
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Failed to edit exhibition' });
    }
  },
};


