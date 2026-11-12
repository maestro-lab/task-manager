
# Task Manager

Простое веб-приложение для управления повседневными задачами.

## Возможности

- Добавление задач
- Просмотр списка задач
- Изменение статуса выполнения
- Удаление задач
- Фильтрация задач
- Подсчёт выполненных и активных задач

## Технологии

### Frontend
- React
- JavaScript
- CSS
- Vite

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg

## Структура проекта

- client — пользовательский интерфейс
- server — серверная часть и API
- database — SQL-скрипты и ER-диаграмма

## Запуск проекта

### 1. Установка зависимостей

В папке client:

npm install

В папке server:

npm install

### 2. Настройка базы данных

Создать базу данных task_manager в PostgreSQL.

Выполнить SQL-скрипт database/schema.sql.

### 3. Настройка переменных окружения

Создать файл server/.env:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=ВАШ_ПАРОЛЬ
DB_PORT=5432

### 4. Запуск backend

Перейти в папку server:

node server.js

### 5. Запуск frontend

Перейти в папку client:

npm run dev

Приложение будет доступно по адресу:

http://localhost:5173

## API

| Метод | Адрес | Описание |
|---|---|---|
| GET | /api/tasks | Получить задачи |
| POST | /api/tasks | Создать задачу |
| PATCH | /api/tasks/:id | Изменить статус |
| DELETE | /api/tasks/:id | Удалить задачу |

## База данных

Основная таблица: tasks.

Описание структуры находится в database/erd.md.

## Автор

Учебный проект для производственной практики.
