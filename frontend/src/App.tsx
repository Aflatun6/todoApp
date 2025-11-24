import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { useLocalTodos } from './hooks/useLocalTodos';
import './styles.css';

export default function App() {
  const { todos, addTodo, updateTodo, deleteTodo, clearAll } = useLocalTodos();

  return (
    <div className="app" style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>Todo — Distributed Systems Demo (frontend)</h1>
      <p style={{ color: '#666' }}>Local-only mode (stored in browser). Later we'll add backend, auth, and realtime editing.</p>

      <AddTodoForm onAdd={addTodo} />

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => { if (confirm('Clear all todos?')) clearAll(); }} style={{ marginRight: 8 }}>Clear all</button>
        <button onClick={() => { const sample = { title: 'Sample todo', description: 'This is sample' }; addTodo({ ...sample, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'OPEN' }); }}>Add sample</button>
      </div>

      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
}
