# Тестирование SEO - Быстрый старт

## 🧪 Как протестировать локально

### 1. Запустите проект

```bash
# В одном терминале - backend
cd backend
npm run dev

# В другом терминале - frontend  
cd frontend
npm run dev
```

### 2. Проверьте robots.txt

Откройте в браузере:
```
http://localhost:3000/robots.txt
```

Или через curl:
```bash
curl http://localhost:3000/robots.txt
```

**Ожидаемый результат:**
```
User-agent: *
Allow: /
Disallow: /login
...
```

### 3. Проверьте sitemap.xml

Откройте в браузере:
```
http://localhost:5000/api/sitemap.xml
```

Или через curl:
```bash
curl http://localhost:5000/api/sitemap.xml
```

**Ожидаемый результат:** XML документ со списком всех страниц

### 4. Проверьте с настоящими данными

Добавьте несколько картин в базу данных через API, затем снова проверьте sitemap - новые картины должны появиться автоматически!

## 🌐 Проверка на production

После деплоя:

1. **robots.txt:**
   ```
   https://aigull-art.com/robots.txt
   ```

2. **sitemap.xml:**
   ```
   https://aigull-art.com/api/sitemap.xml
   ```

## 🔍 Валидаторы

Используйте онлайн-инструменты для проверки:

- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Search Console](https://search.google.com/search-console)
- [Яндекс.Вебмастер](https://webmaster.yandex.ru/)

## ✅ Чек-лист проверки

- [ ] robots.txt доступен по `/robots.txt`
- [ ] sitemap.xml доступен по `/api/sitemap.xml`
- [ ] sitemap содержит все статические страницы
- [ ] sitemap содержит все картины из БД
- [ ] XML валидный (проверить через валидатор)
- [ ] В robots.txt есть ссылка на sitemap
- [ ] Даты `lastmod` корректные
- [ ] Приоритеты настроены правильно

## 🐛 Troubleshooting

**Проблема:** sitemap.xml возвращает 404
- Проверьте, что backend запущен
- Проверьте маршрут в `backend/src/routes/index.ts`

**Проблема:** sitemap пустой
- Проверьте подключение к MongoDB
- Убедитесь, что в базе есть картины
- Проверьте консоль на ошибки

**Проблема:** robots.txt возвращает 404
- Убедитесь, что файл находится в `frontend/public/robots.txt`
- Перезапустите frontend dev server

