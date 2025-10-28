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

  // Получаем базовый URL без '/api' для изображений
  const { protocol, hostname } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Для локальной разработки используем порт 5000
    return `${protocol}//${hostname}:5000${relativePath}`;
  }

  // Для production используем тот же домен
  return `${protocol}//${hostname}${relativePath}`;
};

/**
 * Получает базовый URL API
 */
export const getApiBaseUrl = (): string => {
  // Если задана переменная окружения - используем её
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Иначе используем тот же домен, что и сайт, но с портом 5000 для локальной разработки
  const { protocol, hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:5000/api`;
  }

  // Для production - используем тот же домен
  return `${protocol}//${hostname}/api`;
};
