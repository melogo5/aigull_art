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

  const { origin } = window.location;
  return `${origin}${relativePath}`;
};

/**
 * Получает базовый URL API
 */
export const getApiBaseUrl = (): string => {
  // 2) В локальной разработке (порт 3000) направляем запросы напрямую на backend:5000
  const { hostname, port, protocol } = window.location;
  if (
    (hostname === 'localhost' || hostname === '127.0.0.1') &&
    port === '3000'
  ) {
    return `http://localhost:5000/api`;
  }

  // 3) Во всех остальных случаях используем тот же хост (прокси/ингресс на проде)
  return `${protocol}//${hostname}/api`;
};
