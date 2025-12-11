import { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(''); // store error messages
  const [loading, setLoading] = useState(false); // show loading state

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('todos');
        setTodos(res.data);
      } catch {
        setError('❌ Failed to fetch todos. Please try again later.');
      }
    };
    fetchTodos();
  }, []);

  // Create new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('todos', form);
      setTodos([...todos, res.data]);
      setForm({ title: '', description: '' });
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.error || '❌ Failed to add todo.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    setError('');
    try {
      const res = await api.patch(`todos/${id}`, {
        completed: !completed,
      });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch {
      setError('❌ Failed to update todo.');
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    setError('');
    try {
      await api.delete(`todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch {
      setError('❌ Failed to delete todo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 drop-shadow-lg">📝 Todo Application </h1>

      {/* Global Error Message */}
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg shadow-md">{error}</div>
      )}

      {/* Add Todo Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-6 py-2 bg-red-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition"
      >
        ➕ Add New Todo
      </button>

      {/* Todo List */}
      <ul className="w-full max-w-2xl space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`p-5 rounded-lg shadow-lg flex justify-between items-center transition ${
              todo.completed
                ? 'bg-green-100 border border-green-300'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div>
              <h2
                className={`text-xl font-semibold ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(todo._id, todo.completed)}
                className={`px-4 py-1 rounded-full text-white text-sm font-medium shadow-md transition ${
                  todo.completed
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="px-4 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow-md transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Add Todo</h2>

            {/* Local Error Message */}
            {error && (
              <div className="mb-3 px-3 py-2 bg-red-100 text-red-700 rounded-lg">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError('');
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg shadow-md transition text-white ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
