import { useEffect, useState } from 'react';
import { Todo } from '../types';

const STORAGE_KEY = 'todo_frontend_v1';

export function useLocalTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as Todo[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to localStorage', e);
    }
  }, [todos]);

  const addTodo = (t: Todo) => setTodos(prev => [t, ...prev]);
  const updateTodo = (id: string, patch: Partial<Todo>) =>
    setTodos(prev => prev.map(x => x.id === id ? { ...x, ...patch, updatedAt: new Date().toISOString() } : x));
  const deleteTodo = (id: string) =>
    setTodos(prev => prev.filter(x => x.id !== id));
  const clearAll = () => {
    setTodos([]);
  };

  return { todos, addTodo, updateTodo, deleteTodo, clearAll };
}
