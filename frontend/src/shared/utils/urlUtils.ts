// Утилиты для работы с URL

/**
 * Преобразует относительный путь в полный URL
 * @param relativePath - относительный путь (например: '/uploads/image.jpg')
 * @returns полный URL для изображения
 */
export const getFullImageUrl = (relativePath?: string): string | undefined => {
  if (!relativePath) return undefined;

  // Если путь уже полный (содержит протокол), возвращаем как есть
  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://')
  ) {
    return relativePath;
  }

  // Всегда используем тот же домен БЕЗ порта
  // - В development: Vite proxy проксирует /uploads/ на localhost:5000
  // - В production: nginx проксирует /uploads/ на backend:5000
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}${relativePath}`;
};

/**
 * Получает базовый URL API
 */
export const getApiBaseUrl = (): string => {
  // Всегда используем тот же домен БЕЗ порта
  // - В development: Vite proxy проксирует /api/ на localhost:5000
  // - В production: nginx проксирует /api/ на backend:5000
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}/api`;
};
