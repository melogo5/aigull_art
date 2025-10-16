import express from 'express';
import userRoutes from './userRoutes';
import pictureRoutes from './pictureRoutes';
import exhibitionRoutes from './exhibitionRoutes';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/users', userRoutes);
router.use('/pictures', pictureRoutes);
router.use('/exhibitions', exhibitionRoutes);

export default router;
