import express from 'express';
import { pictureController } from '../controllers/pictureController';

const router = express.Router();

// /api/pictures
router.get('/', pictureController.getPictures);
router.post('/addPicture', pictureController.addPicture);
router.delete('/deletePicture/:id', pictureController.deletePicture);
router.put('/editPicture/:id', pictureController.editPicture);

export default router;


