import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../types';

const API_URL = 'http://localhost:8081/api/v1/todos'; // backend

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Todo[]>(API_URL);
      setTodos(res.data);
    } catch (e: any) {
      console.error(e);
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo: Todo) => {
    try {
      const res = await axios.post<Todo>(API_URL, todo);
      setTodos(prev => [res.data, ...prev]);
    } catch (e: any) {
      console.error(e);
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id: string, patch: Partial<Todo>) => {
    try {
      const res = await axios.patch<Todo>(`${API_URL}/${id}`, patch);
      setTodos(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (e: any) {
      console.error(e);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (e: any) {
      console.error(e);
      setError('Failed to delete todo');
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(API_URL);
      setTodos([]);
    } catch (e: any) {
      console.error(e);
      setError('Failed to clear todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo, clearAll };
}
