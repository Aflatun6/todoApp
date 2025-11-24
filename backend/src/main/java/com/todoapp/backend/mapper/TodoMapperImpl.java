package com.todoapp.backend.mapper;

import com.todoapp.backend.dto.CreateTodoReq;
import com.todoapp.backend.dto.TodoRes;
import com.todoapp.backend.entity.Todo;
import org.springframework.stereotype.Service;

@Service
public class TodoMapperImpl {

    public TodoRes entityToReturnTODO(Todo todo) {
        if (todo == null) {
            return null;
        }

        TodoRes todoRes = new TodoRes();

        todoRes.setId(todo.getId());
        todoRes.setCreatedAt(todo.getCreatedAt());
        todoRes.setUpdatedAt(todo.getUpdatedAt());
        todoRes.setTitle(todo.getTitle());
        todoRes.setDescription(todo.getDescription());
        todoRes.setStatus(todo.getStatus());

        return todoRes;
    }

    public Todo createDtoToEntity(CreateTodoReq createTodoReq) {
        if (createTodoReq == null) {
            return null;
        }

        Todo todo = new Todo();

        if (createTodoReq.getTitle() != null) {
            todo.setTitle(createTodoReq.getTitle());
        }
        if (createTodoReq.getStatus() != null) {
            todo.setStatus(createTodoReq.getStatus());
        }
        if (createTodoReq.getDescription() != null) {
            todo.setDescription(createTodoReq.getDescription());
        }


        return todo;
    }
}