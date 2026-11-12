
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { app, pool } = require('../app');

let taskId;

test('GET /api/tasks — получение списка задач', async () => {
    const response = await request(app).get('/api/tasks');

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

test('POST /api/tasks — создание задачи', async () => {
    const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Тестовая задача' });

    assert.equal(response.status, 201);
    assert.equal(response.body.title, 'Тестовая задача');

    taskId = response.body.id;
});

test('POST /api/tasks — пустое название', async () => {
    const response = await request(app)
        .post('/api/tasks')
        .send({ title: '   ' });

    assert.equal(response.status, 400);
});

test('PATCH /api/tasks/:id — изменение статуса', async () => {
    const response = await request(app)
        .patch(`/api/tasks/${taskId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.completed, true);
});

test('DELETE /api/tasks/:id — удаление задачи', async () => {
    const response = await request(app)
        .delete(`/api/tasks/${taskId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.message, 'Задача удалена');
});

after(async () => {
    await pool.end();
});
