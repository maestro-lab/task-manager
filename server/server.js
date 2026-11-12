const { app, pool } = require('./app');

const PORT = process.env.PORT || 5000;

pool.query('SELECT NOW()')
    .then(() => console.log('Подключение к PostgreSQL успешно'))
    .catch((error) => console.error('Ошибка PostgreSQL:', error));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});