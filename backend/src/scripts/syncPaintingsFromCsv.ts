import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Picture from '../models/Picture';
import connectDB from '../config/db';
import { parse } from 'csv-parse/sync';

type CsvRecord = {
  '#': string;
  Год: string;
  'Изображение для сайта': string;
  Page: string;
  'Основа работы': string;
  'Чем написано': string;
  'Высота (без рамы), см': string;
  'Ширина (без рамы), см': string;
};

function extractCodeAndFileName(imageField: string): {
  code: string;
  fileName: string;
} {
  // Пример значения:
  // :aigull:paintings:2024:2401-02:2401-02_web.jpg
  const trimmed = imageField.trim();
  const parts = trimmed.split(':').filter(Boolean);
  const fileName = parts[parts.length - 1] || '';

  // 2401-02_web.jpg -> 2401-02
  const code = fileName.split('_')[0] || fileName.replace('.jpg', '');

  return { code, fileName };
}

function parseNumber(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  const parsed = Number(trimmed.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function syncPaintingsFromCsv(): Promise<void> {
  const csvPath = path.join(process.cwd(), 'src', 'paintings_db.csv');

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found at path: ${csvPath}`);
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRecord[];

  const seenCodes = new Set<string>();

  for (const record of records) {
    const imageField = record['Изображение для сайта'];
    if (!imageField) {
      console.warn('Skipping record without image field:', record);
      continue;
    }

    const { code, fileName } = extractCodeAndFileName(imageField);
    if (!code || !fileName) {
      console.warn('Skipping record with invalid image field:', record);
      continue;
    }

    seenCodes.add(code);

    const year = parseInt(record['Год'], 10);
    const title = record.Page?.trim() || code;
    const base = record['Основа работы']?.trim() || '';
    const technique = record['Чем написано']?.trim() || '';
    const material = [base, technique].filter(Boolean).join(', ');

    const height = parseNumber(record['Высота (без рамы), см'] || '');
    const width = parseNumber(record['Ширина (без рамы), см'] || '');

    // Картинки будут лежать в /uploads/paintings/<fileName>
    const imgUrl = `/uploads/paintings/${fileName}`;

    await Picture.findOneAndUpdate(
      { code },
      {
        code,
        name: title,
        description: '',
        year: Number.isFinite(year) ? year : new Date().getFullYear(),
        available: true,
        width,
        height,
        material,
        imgUrl,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  // Удаляем записи, которые ранее были синхронизированы из CSV (имеют code),
  // но теперь отсутствуют в CSV. Записи без code не трогаем.
  if (seenCodes.size > 0) {
    await Picture.deleteMany({
      code: { $exists: true, $nin: Array.from(seenCodes) },
    });
  }

  console.log(
    `Sync from CSV completed. Processed ${seenCodes.size} unique codes.`
  );
}

// Позволяет запускать скрипт как отдельную CLI-команду:
// npx ts-node src/scripts/syncPaintingsFromCsv.ts
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await syncPaintingsFromCsv();
      await mongoose.disconnect();
      process.exit(0);
    } catch (error) {
      console.error('Failed to sync paintings from CSV:', error);
      await mongoose.disconnect();
      process.exit(1);
    }
  })();
}


