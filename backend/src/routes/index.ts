import express from 'express';
import userRoutes from './userRoutes';
import pictureRoutes from './pictureRoutes';
import exhibitionRoutes from './exhibitionRoutes';
import sitemapRoutes from './sitemapRoutes';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/users', userRoutes);
router.use('/pictures', pictureRoutes);
router.use('/exhibitions', exhibitionRoutes);
router.use('/', sitemapRoutes);

export default router;
