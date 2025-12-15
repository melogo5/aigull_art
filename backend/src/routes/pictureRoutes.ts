import express from 'express';
import multer from 'multer';
import path from 'path';
import { pictureController } from '../controllers/pictureController';
import { config } from '../config/config';
import { auth } from '../middlewares/auth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) =>
    cb(null, path.join(process.cwd(), 'uploads')),
  filename: (_req, file, cb) => {
    const cleanName = file.originalname
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${cleanName}`);
  },
});
console.log('current:', process.cwd());
const upload = multer({ storage });

router.get('/', pictureController.getPictures);
router.get('/:id', pictureController.getPictureById);

router.post('/addPicture', auth, pictureController.addPicture);
router.delete('/deletePicture/:id', auth, pictureController.deletePicture);
router.put('/editPicture/:id', auth, pictureController.editPicture);

router.post('/upload', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    console.log('File uploaded successfully:', {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
    });

    const fs = require('fs');
    if (fs.existsSync(req.file.path)) {
      console.log('File confirmed to exist at:', req.file.path);
    } else {
      console.error('File does not exist after upload:', req.file.path);
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    console.log('Generated file URL:', fileUrl);
    res.status(200).json({ success: true, fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
