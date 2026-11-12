
const { app, pool } = require('./app');

const PORT = 5000;

pool.query('SELECT NOW()')
    .then(() => console.log('Подключение к PostgreSQL успешно'))
    .catch((error) => console.error('Ошибка PostgreSQL:', error.message));

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
