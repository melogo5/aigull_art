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
db.createCollection('pictures');

// Создаем индексы
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

// Моки для картин
db.pictures.insertMany([
  {
    name: 'Пейзаж в пастели',
    description: 'Мягкие тона и спокойствие природы',
    year: 2024,
    available: true,
    width: 50,
    height: 70,
    material: 'Пастель на бумаге',
    imgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Городской вечер',
    description: 'Огни большого города',
    year: 2023,
    available: false,
    width: 60,
    height: 60,
    material: 'Масло на холсте',
    imgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Морской бриз',
    description: 'Свежесть волн и неба',
    year: 2022,
    available: true,
    width: 80,
    height: 60,
    material: 'Акрил на холсте',
    imgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully');
