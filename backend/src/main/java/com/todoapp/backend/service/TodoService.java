package com.todoapp.backend.service;

import com.todoapp.backend.dto.CreateTodoReq;
import com.todoapp.backend.dto.TodoRes;
import com.todoapp.backend.dto.UpdateTodoReq;
import com.todoapp.backend.entity.Todo;
import com.todoapp.backend.mapper.TodoMapperImpl;
import com.todoapp.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoService {
    private final TodoRepository repository;
    private final TodoMapperImpl mapper;

    @Autowired
    public TodoService(TodoRepository repository, TodoMapperImpl mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<TodoRes> getAll() {
        return repository.findAll().stream().map(mapper::entityToReturnTODO).toList();

    }

    public TodoRes create(CreateTodoReq todo) {
        Todo dtoToEntity = mapper.createDtoToEntity(todo);

        dtoToEntity.setCreatedAt(LocalDateTime.now());
        dtoToEntity.setUpdatedAt(LocalDateTime.now());

        return mapper.entityToReturnTODO(repository.save(dtoToEntity));
    }

    public TodoRes update(String id, UpdateTodoReq patch) {
        return repository.findById(id).map(todo -> {
            if (patch.getTitle() != null) todo.setTitle(patch.getTitle());
            if (patch.getDescription() != null) todo.setDescription(patch.getDescription());
            if (patch.getStatus() != null) todo.setStatus(patch.getStatus());
            todo.setUpdatedAt(LocalDateTime.now());
            return mapper.entityToReturnTODO(repository.save(todo));
        }).orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public void clearAll() {
        repository.deleteAll();
    }
}
