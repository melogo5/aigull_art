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

## 📝 Лицензия

MIT License
