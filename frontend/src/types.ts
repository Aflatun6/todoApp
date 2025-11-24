export type TodoStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
