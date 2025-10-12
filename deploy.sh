#!/bin/bash

# Скрипт для развертывания на VPS сервере

set -e

echo "🚀 Начинаем развертывание Aigull Art..."

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Устанавливаем..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Проверяем наличие Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Устанавливаем..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Создаем директорию для приложения
APP_DIR="/opt/aigull-art"
sudo mkdir -p $APP_DIR
cd $APP_DIR

# Клонируем репозиторий (если еще не клонирован)
if [ ! -d ".git" ]; then
    echo "📥 Клонируем репозиторий..."
    sudo git clone https://github.com/your-username/aigull_art.git .
fi

# Обновляем код
echo "🔄 Обновляем код..."
sudo git pull origin main

# Создаем файл окружения
if [ ! -f ".env" ]; then
    echo "⚙️ Создаем файл окружения..."
    sudo tee .env > /dev/null <<EOF
NODE_ENV=production
MONGO_URI=mongodb://admin:password123@mongodb:27017/aigull_art?authSource=admin
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRE=7d
CORS_ORIGIN=http://your-domain.com
EOF
fi

# Останавливаем старые контейнеры
echo "🛑 Останавливаем старые контейнеры..."
sudo docker-compose down

# Собираем и запускаем новые контейнеры
echo "🔨 Собираем и запускаем контейнеры..."
sudo docker-compose up -d --build

# Ждем запуска сервисов
echo "⏳ Ждем запуска сервисов..."
sleep 30

# Проверяем статус
echo "📊 Статус сервисов:"
sudo docker-compose ps

# Очищаем старые образы
echo "🧹 Очищаем старые образы..."
sudo docker image prune -f

echo "✅ Развертывание завершено!"
echo "🌐 Приложение доступно по адресу: http://your-domain.com"
echo "📊 API доступно по адресу: http://your-domain.com/api"
