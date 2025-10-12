// Инициализация базы данных
db = db.getSiblingDB('aigull_art');

// Создаем пользователя для приложения
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'aigull_art'
    }
  ]
});

// Создаем коллекции
db.createCollection('users');
db.createCollection('artworks');

// Создаем индексы
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

print('Database initialized successfully');
