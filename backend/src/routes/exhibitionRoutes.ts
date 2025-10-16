import express from 'express';
import { exhibitionController } from '../controllers/exhibitionController';

const router = express.Router();

// /api/exhibitions
router.get('/', exhibitionController.getExhibitions);
router.post('/addExhibition', exhibitionController.addExhibition);
router.delete('/deleteExhibition/:id', exhibitionController.deleteExhibition);
router.put('/editExhibition/:id', exhibitionController.editExhibition);

export default router;


