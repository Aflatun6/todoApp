package com.todoapp.backend.service;

import com.todoapp.backend.model.Todo;
import com.todoapp.backend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoService {
    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> getAll() {
        return repository.findAll();
    }

    public Todo create(Todo todo) {
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return repository.save(todo);
    }

    public Todo update(String id, Todo patch) {
        return repository.findById(id).map(todo -> {
            if (patch.getTitle() != null) todo.setTitle(patch.getTitle());
            if (patch.getDescription() != null) todo.setDescription(patch.getDescription());
            if (patch.getStatus() != null) todo.setStatus(patch.getStatus());
            todo.setUpdatedAt(LocalDateTime.now());
            return repository.save(todo);
        }).orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public void clearAll() {
        repository.deleteAll();
    }
}
