import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import './styles.css';

export default function App() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, clearAll } = useTodos();

  return (
    <div className="app" style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>Todo — Distributed Systems Demo (Frontend + Backend)</h1>
      <p style={{ color: '#666' }}>Backend-connected mode. Multi-device updates possible via REST API.</p>

      {loading && <div>Loading todos...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <AddTodoForm onAdd={addTodo} />

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => { if (confirm('Clear all todos?')) clearAll(); }} style={{ marginRight: 8 }}>Clear all</button>
      </div>

      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
}
