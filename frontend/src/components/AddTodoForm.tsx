import React, { useState } from 'react';
import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function AddTodoForm({ onAdd }: { onAdd: (t: Todo) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const now = new Date().toISOString();
    onAdd({
      id: uuidv4(),
      title: title.trim(),
      description: description.trim() || undefined,
      status: 'OPEN',
      createdAt: now,
      updatedAt: now
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form" style={{ marginBottom: 16 }}>
      <input
        placeholder="New task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ padding: 8, width: '60%', marginRight: 8 }}
      />
      <input
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ padding: 8, width: '30%', marginRight: 8 }}
      />
      <button type="submit" style={{ padding: '8px 12px' }}>Add</button>
    </form>
  );
}
