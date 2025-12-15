# Aigull Art

## 🏗️ Архитектура

Проект состоит из двух основных частей:

- **Frontend** - React + TypeScript приложение с архитектурой FSD (Feature-Sliced Design)
- **Backend** - Node.js + Express.js API с TypeScript

## 🚀 Технологический стек

## 🔍 SEO оптимизация

Проект включает файлы для оптимизации индексации поисковыми системами:

### robots.txt
- **Расположение**: `frontend/public/robots.txt`
- **Назначение**: Управляет доступом поисковых роботов к разделам сайта
- **Автоматически доступен** по адресу: `https://aigull-art.com/robots.txt`

### sitemap.xml
- **Расположение**: Генерируется динамически backend'ом
- **Эндпоинт**: `GET /api/sitemap.xml`
- **Доступен по адресу**: `https://aigull-art.com/api/sitemap.xml`
- **Особенности**:
  - Автоматически включает все картины из базы данных
  - Обновляется в реальном времени при добавлении новых работ
  - Включает статические страницы: главная, галерея, выставки, биография, контакты

**Настройка URL в .env:**
```env
FRONTEND_URL=https://aigull-art.com  # Ваш production URL
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

### Архитектура Docker

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   MongoDB       │
│   (Nginx)       │    │   (Express)     │    │   (Database)    │
│   Port: 80      │◄──►│   Port: 5000    │◄──►│   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### CI/CD Pipeline

Проект настроен для автоматического развертывания через GitHub Actions:

1. **Push в main/master** → автоматический тест, сборка и деплой
2. **Pull Request** → только тестирование
3. **Docker образы** публикуются в GitHub Container Registry

## 📝 Лицензия

MIT License
