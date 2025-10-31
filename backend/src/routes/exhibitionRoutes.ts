import express from 'express';
import { exhibitionController } from '../controllers/exhibitionController';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/', exhibitionController.getExhibitions);
router.post('/addExhibition', auth, exhibitionController.addExhibition);
router.delete('/deleteExhibition/:id', auth, exhibitionController.deleteExhibition);
router.put('/editExhibition/:id', auth, exhibitionController.editExhibition);

export default router;
