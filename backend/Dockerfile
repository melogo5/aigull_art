# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev для сборки)
RUN npm ci

# Копируем исходный код
COPY . .

# Компилируем TypeScript
RUN npm run build

# Удаляем dev зависимости после сборки
RUN npm prune --production

# Открываем порт
EXPOSE 5000

# Создаем директорию для загрузок
RUN mkdir -p /app/uploads

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Меняем владельца файлов и директории uploads
RUN chown -R nodejs:nodejs /app
RUN chmod 755 /app/uploads
USER nodejs

# Запускаем приложение: копируем картинки и синхронизируем базу из CSV перед стартом
CMD ["sh", "-c", "mkdir -p /app/uploads/paintings && cp -r /app/src/paintings/* /app/uploads/paintings/ 2>/dev/null || true && node dist/scripts/syncPaintingsFromCsv.js && npm start"]
