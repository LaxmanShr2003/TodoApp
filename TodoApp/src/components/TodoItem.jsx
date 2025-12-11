import api from '../api';

function TodoItem({ todo, onUpdate, onDelete }) {
  const toggleComplete = async () => {
    const { data } = await api.patch(`/${todo._id}`, {
      completed: !todo.completed,
    });
    onUpdate(data);
  };

  const deleteTodo = async () => {
    await api.delete(`/${todo._id}`);
    onDelete(todo._id);
  };

  return (
    <div className="todo-item">
      <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={toggleComplete}>{todo.completed ? 'Undo' : 'Complete'}</button>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}

export default TodoItem;
