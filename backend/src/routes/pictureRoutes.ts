import express from 'express';
import multer from 'multer';
import path from 'path';
import { pictureController } from '../controllers/pictureController';

const router = express.Router();

// Multer storage for local uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
console.log('current:', process.cwd())
const upload = multer({ storage });

// /api/pictures
router.get('/', pictureController.getPictures);
router.post('/addPicture', pictureController.addPicture);
router.delete('/deletePicture/:id', pictureController.deletePicture);
router.put('/editPicture/:id', pictureController.editPicture);

// Upload endpoint -> returns fileUrl to be saved in imgUrl
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, fileUrl });
});

export default router;


