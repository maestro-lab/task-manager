
import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function loadTasks() {
        try {
            setError('');
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Не удалось загрузить задачи');
            }

            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError('Не удалось подключиться к серверу');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    async function addTask(event) {
        event.preventDefault();

        if (!title.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error('Ошибка добавления задачи');
            }

            const newTask = await response.json();
            setTasks([...tasks, newTask]);
            setTitle('');
            setError('');
        } catch (err) {
            setError('Не удалось добавить задачу');
        }
    }

    async function toggleTask(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Ошибка изменения задачи');
            }

            const updatedTask = await response.json();

            setTasks(tasks.map(task =>
                task.id === id ? updatedTask : task
            ));
        } catch (err) {
            setError('Не удалось изменить задачу');
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Ошибка удаления задачи');
            }

            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Не удалось удалить задачу');
        }
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const completedCount = tasks.filter(task => task.completed).length;
    const activeCount = tasks.length - completedCount;

    return (
        <main className="app">
            <section className="task-card">
                <div className="header">
                    <span className="eyebrow">ПЛАНИРОВЩИК</span>
                    <h1>Мои задачи</h1>
                    <p>Планируй дела и следи за результатами.</p>
                </div>

                <form className="task-form" onSubmit={addTask}>
                    <input
                        type="text"
                        placeholder="Напиши новую задачу..."
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <button type="submit">Добавить</button>
                </form>

                {error && <div className="error">{error}</div>}

                <div className="statistics">
                    <div>
                        <strong>{tasks.length}</strong>
                        <span>Всего</span>
                    </div>
                    <div>
                        <strong>{activeCount}</strong>
                        <span>Активных</span>
                    </div>
                    <div>
                        <strong>{completedCount}</strong>
                        <span>Выполнено</span>
                    </div>
                </div>

                <div className="filters">
                    <button
                        className={filter === 'all' ? 'selected' : ''}
                        onClick={() => setFilter('all')}
                    >
                        Все
                    </button>
                    <button
                        className={filter === 'active' ? 'selected' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Активные
                    </button>
                    <button
                        className={filter === 'completed' ? 'selected' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Выполненные
                    </button>
                </div>

                <div className="task-list">
                    {loading ? (
                        <p className="empty">Загрузка задач...</p>
                    ) : filteredTasks.length === 0 ? (
                        <p className="empty">Задач пока нет</p>
                    ) : (
                        filteredTasks.map(task => (
                            <div className="task-item" key={task.id}>
                                <label className="task-label">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <span className={task.completed ? 'done' : ''}>
                                        {task.title}
                                    </span>
                                </label>

                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(task.id)}
                                    title="Удалить задачу"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <footer>
                    Task Manager · Учебный проект
                </footer>
            </section>
        </main>
    );
}

export default App;
