import { Request, Response } from 'express';
import Picture from '../models/Picture';

/**
 * Генерирует sitemap.xml для поисковых систем
 * Включает статические страницы и динамический контент (картины)
 */
export const getSitemap = async (req: Request, res: Response) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://aigull-art.com';

    // Статические страницы сайта
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/gallery', priority: '0.9', changefreq: 'daily' },
      { url: '/exhibitions', priority: '0.9', changefreq: 'weekly' },
      { url: '/bio', priority: '0.8', changefreq: 'monthly' },
      { url: '/contacts', priority: '0.7', changefreq: 'monthly' },
    ];

    // Получаем все картины из базы данных
    const pictures = await Picture.find({}).select('_id name updatedAt').lean();

    // Формируем XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Добавляем статические страницы
    staticPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    // Добавляем страницы картин
    pictures.forEach(picture => {
      const lastmod = picture.updatedAt
        ? new Date(picture.updatedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/gallery/${picture._id}</loc>\n`;
      sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>monthly</changefreq>\n`;
      sitemap += `    <priority>0.8</priority>\n`;
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';

    // Отправляем XML с правильным content-type
    res.header('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate sitemap',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
