import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  onUpdate,
  onDelete,
}: {
  todos: Todo[];
  onUpdate: (id: string, patch: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      {todos.length === 0 ? <div>No todos yet. Add one!</div> : null}
      {todos.map(t => (
        <TodoItem key={t.id} todo={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
