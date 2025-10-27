import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/config';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import path from 'path';
import fs from 'fs';

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Compression mpictureRoutesiddleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));
app.use(logger);

// Debug middleware for all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing middleware
app.use(cookieParser());

// Static uploads with CORS and error handling
app.use(
  '/uploads',
  (req, res, next) => {
    console.log('Static file request:', req.url);

    // Set CORS headers for static files
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');

    // Decode URL-encoded characters (like %20 for spaces)
    const decodedUrl = decodeURIComponent(req.url);
    console.log('Decoded URL:', decodedUrl);

    // Check if file exists with decoded path
    const filePath = path.join(process.cwd(), 'uploads', decodedUrl);
    console.log('Looking for file:', filePath);

    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      res.status(404).json({ success: false, message: 'File not found' });
      return;
    }

    // Update req.url to use decoded version for express.static
    req.url = decodedUrl;
    next();
  },
  express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res, path) => {
      // Set proper content type for images
      if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (path.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (path.endsWith('.gif')) {
        res.setHeader('Content-Type', 'image/gif');
      } else if (path.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      }

      // Set cache headers
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  })
);

// API routes
app.use('/api', routes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
