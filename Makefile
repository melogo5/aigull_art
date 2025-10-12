# Aigull Art Docker Management

.PHONY: help dev prod build up down logs clean

# Показать помощь
help:
	@echo "Доступные команды:"
	@echo "  dev        - Запустить в режиме разработки с пересборкой"
	@echo "  dev-watch  - Запустить в режиме разработки с watch (рекомендуется)"
	@echo "  dev-up     - Запустить в режиме разработки без пересборки"
	@echo "  dev-down   - Остановить контейнеры разработки"
	@echo "  dev-logs   - Показать логи разработки"
	@echo "  dev-restart- Перезапустить контейнеры разработки"
	@echo "  prod       - Запустить в продакшен режиме"
	@echo "  build      - Собрать Docker образы"
	@echo "  up         - Запустить контейнеры"
	@echo "  down       - Остановить контейнеры"
	@echo "  logs       - Показать логи"
	@echo "  clean      - Очистить Docker"
	@echo "  restart    - Перезапустить контейнеры"

# Режим разработки
dev:
	docker-compose -f docker-compose.dev.yml up --build

dev-watch:
	docker-compose -f docker-compose.dev.yml watch

dev-up:
	docker-compose -f docker-compose.dev.yml up

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

dev-restart:
	docker-compose -f docker-compose.dev.yml restart

# Продакшен режим
prod:
	docker-compose up -d --build

# Сборка
build:
	docker-compose build

# Запуск
up:
	docker-compose up -d

# Остановка
down:
	docker-compose down

# Логи
logs:
	docker-compose logs -f

# Перезапуск
restart: down up

# Очистка
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

# Очистка образов
clean-images:
	docker image prune -f

# Очистка всего Docker
clean-all: clean clean-images

# Проверка статуса
status:
	docker-compose ps

# Подключение к контейнеру бэкенда
backend-shell:
	docker-compose exec backend sh

# Подключение к MongoDB
mongo-shell:
	docker-compose exec mongodb mongosh

# Просмотр логов бэкенда
backend-logs:
	docker-compose logs -f backend

# Просмотр логов фронтенда
frontend-logs:
	docker-compose logs -f frontend

# Просмотр логов MongoDB
mongo-logs:
	docker-compose logs -f mongodb
