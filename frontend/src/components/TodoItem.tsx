import React, { useState } from 'react';
import { Todo } from '../types';

export default function TodoItem({
  todo,
  onUpdate,
  onDelete
}: {
  todo: Todo;
  onUpdate: (id: string, patch: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.description || '');

  const save = () => {
    onUpdate(todo.id, { title: title.trim() || todo.title, description: desc.trim() || undefined });
    setEditing(false);
  };

  return (
    <div className="todo-item" style={{
      border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{ flex: 1 }}>
        {editing ? (
          <>
            <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 6, marginBottom: 6 }} />
            <textarea value={desc} onChange={e => setDesc(e.target.value)} style={{ width: '100%', padding: 6 }} />
            <div style={{ marginTop: 8 }}>
              <button onClick={save} style={{ marginRight: 8 }}>Save</button>
              <button onClick={() => { setEditing(false); setTitle(todo.title); setDesc(todo.description || ''); }}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 600 }}>{todo.title}</div>
            {todo.description ? <div style={{ color: '#555' }}>{todo.description}</div> : null}
            <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
              {todo.status} • updated {new Date(todo.updatedAt).toLocaleString()}
            </div>
          </>
        )}
      </div>

      <div style={{ marginLeft: 12 }}>
        <button onClick={() => onUpdate(todo.id, { status: todo.status === 'DONE' ? 'OPEN' : 'DONE' })} style={{ marginRight: 8 }}>
          {todo.status === 'DONE' ? 'Reopen' : 'Done'}
        </button>
        <button onClick={() => setEditing(v => !v)} style={{ marginRight: 8 }}>{editing ? 'Edit' : 'Edit'}</button>
        <button onClick={() => onDelete(todo.id)} style={{ color: 'crimson' }}>Delete</button>
      </div>
    </div>
  );
}
