# Task Manager

**Task Manager** — учебное веб-приложение для управления повседневными задачами. Позволяет создавать задачи, изменять их статус, просматривать список и удалять ненужные записи.

## Возможности

- Добавление новых задач.
- Просмотр списка задач.
- Изменение статуса выполнения.
- Удаление задач.
- Фильтрация по статусу: все, активные, выполненные.
- Подсчёт активных и выполненных задач.
- Сохранение данных в PostgreSQL.

## Используемые технологии

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
- dotenv
- cors

### Тестирование
- Node.js Test Runner
- Supertest

## Структура проекта

```text
task-manager/
├── client/                 # Frontend-приложение
│   └── src/
│       ├── App.jsx
│       └── App.css
├── server/                 # Backend-приложение
│   ├── app.js              # Express-приложение и API
│   ├── server.js           # Запуск сервера
│   ├── tests/
│   │   └── tasks.test.js   # Автоматические тесты API
│   └── .env                # Настройки подключения к БД
├── database/
│   ├── schema.sql          # SQL-схема базы данных
│   └── erd.md              # ER-диаграмма
├── .gitignore
└── README.md
```

## Требования

Для запуска проекта необходимы:
- Node.js
- npm
- PostgreSQL

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/maestro-lab/task-manager.git
cd task-manager
```

### 2. Установка зависимостей

В папке `client`:

```bash
cd client
npm install
```

В папке `server`:

```bash
cd ../server
npm install
```

### 3. Настройка базы данных

Создать базу данных `task_manager` в PostgreSQL.

Выполнить SQL-скрипт `database/schema.sql`.

### 4. Настройка переменных окружения

Создать файл `server/.env`:

```dotenv
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=ВАШ_ПАРОЛЬ
DB_PORT=5432
```

Вместо `ВАШ_ПАРОЛЬ` указать пароль пользователя PostgreSQL.

### 5. Запуск backend

В папке `server` выполнить:

```bash
npm start
```

Сервер будет доступен по адресу:

`http://localhost:5000`

### 6. Запуск frontend

В отдельном терминале, в папке `client`, выполнить:

```bash
npm run dev
```

Vite выведет адрес приложения в терминал. Обычно это:

`http://localhost:5173`

Если порт занят, Vite может автоматически выбрать другой.

## API

| Метод | Адрес | Описание |
|---|---|---|
| GET | `/api/tasks` | Получение списка задач |
| POST | `/api/tasks` | Создание новой задачи |
| PATCH | `/api/tasks/:id` | Изменение статуса выполнения |
| DELETE | `/api/tasks/:id` | Удаление задачи |

## База данных

Проект использует PostgreSQL.

Основная таблица — `tasks`.

| Поле | Тип | Описание |
|---|---|---|
| id | SERIAL | Первичный ключ |
| title | VARCHAR(255) | Название задачи |
| completed | BOOLEAN | Статус выполнения |
| created_at | TIMESTAMP | Дата создания |

SQL-схема находится в `database/schema.sql`, ER-диаграмма — в `database/erd.md`.

## Автоматическое тестирование

Для проверки API используется Node.js Test Runner и библиотека Supertest.

Запуск тестов из папки `server`:

```bash
npm test
```

Проверяются следующие сценарии:
- Получение списка задач.
- Создание задачи.
- Проверка пустого названия.
- Изменение статуса задачи.
- Удаление задачи.

На момент подготовки документации успешно пройдены все 5 автоматических тестов.

## Автор

Учебный проект для производственной практики.