# Aigull Art

## 🏗️ Архитектура

Проект состоит из двух основных частей:

- **Frontend** - React + TypeScript приложение с архитектурой FSD (Feature-Sliced Design)
- **Backend** - Node.js + Express.js API с TypeScript

## 🚀 Технологический стек

### Frontend

- React 18
- TypeScript
- Vite (современный сборщик)
- React Router DOM
- Axios для HTTP запросов
- Архитектура FSD (Feature-Sliced Design)

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT аутентификация
- Bcrypt для хеширования паролей

## 🔧 Настройка проекта

### Git Hooks

Проект использует Git hooks для обеспечения качества кода:

- **pre-push**: Запускает сборку frontend перед push, предотвращая отправку сломанного кода

**Автоматическая настройка:**
```bash
npm install  # Автоматически настроит hooks через postinstall
```

**Ручная настройка:**
```bash
npm run setup-hooks
```

или

```bash
# Linux/Mac
bash scripts/setup-hooks.sh

# Windows PowerShell
.\scripts\setup-hooks.ps1
```

**Обход hooks (использовать осторожно!):**
```bash
git push --no-verify
```

## 📁 Структура проекта

```
├── frontend/                 # React приложение
│   ├── src/
│   │   ├── app/             # Инициализация приложения
│   │   ├── pages/           # Страницы приложения
│   │   ├── widgets/         # Крупные UI блоки
│   │   ├── features/        # Бизнес-логика
│   │   ├── entities/        # Бизнес-сущности
│   │   └── shared/          # Переиспользуемые модули
│   ├── public/
│   └── package.json
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/          # Конфигурация
│   │   ├── controllers/     # Контроллеры
│   │   ├── models/          # Модели данных
│   │   ├── routes/          # Маршруты
│   │   ├── middlewares/     # Промежуточное ПО
│   │   ├── services/        # Бизнес-логика
│   │   └── utils/           # Утилиты
│   └── package.json
└── README.md
```

Тестируем деплой на стенд

## 🐳 Быстрый старт с Docker

Проект настроен для автоматического отслеживания изменений файлов:

- **Backend**: Автоматическая перезагрузка при изменении файлов в `./backend/src/`
- **Frontend**: Hot Module Replacement (HMR) при изменении файлов в `./frontend/src/`
- **Конфигурационные файлы**: Автоматическая пересборка при изменении `package.json`

**Переменные окружения для watch mode:**

- `CHOKIDAR_USEPOLLING=true` - Включает polling для файловых событий
- `WATCHPACK_POLLING=true` - Включает polling для Webpack/Vite

#### Продакшн режим

```bash
# Собрать и запустить продакшен версию
npm run docker:build
npm run docker:up

# Или через Makefile
make prod
```

### Архитектура Docker

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   MongoDB       │
│   (Nginx)       │    │   (Express)     │    │   (Database)    │
│   Port: 80      │◄──►│   Port: 5000    │◄──►│   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
NODE_ENV=production
MONGO_URI=mongodb://admin:password123@mongodb:27017/aigull_art?authSource=admin
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost
```

## 🚀 Развертывание на VPS

### Автоматическое развертывание

1. **Настройте секреты в GitHub**:
   - `VPS_HOST` - IP адрес вашего сервера
   - `VPS_USERNAME` - имя пользователя
   - `VPS_SSH_KEY` - приватный SSH ключ

2. **На сервере выполните**:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/your-username/aigull_art/main/deploy.sh | bash
   ```

### Ручное развертывание

```bash
# На VPS сервере
git clone https://github.com/your-username/aigull_art.git
cd aigull_art
cp env.example .env
# Отредактируйте .env файл
sudo docker-compose up -d --build
```

### CI/CD Pipeline

Проект настроен для автоматического развертывания через GitHub Actions:

1. **Push в main/master** → автоматический тест, сборка и деплой
2. **Pull Request** → только тестирование
3. **Docker образы** публикуются в GitHub Container Registry

## 📝 Лицензия

MIT License
