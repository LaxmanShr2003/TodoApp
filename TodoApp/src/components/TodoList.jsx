import TodoItem from './TodoItem';

function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TodoList;
