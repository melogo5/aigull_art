import express from 'express';
import { getSitemap } from '../controllers/sitemapController';

const router = express.Router();

// GET /api/sitemap.xml - Получить sitemap для поисковых систем
router.get('/sitemap.xml', getSitemap);

export default router;
