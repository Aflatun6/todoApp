package com.todoapp.backend.controller;

import com.todoapp.backend.dto.CreateTodoReq;
import com.todoapp.backend.dto.TodoRes;
import com.todoapp.backend.dto.UpdateTodoReq;
import com.todoapp.backend.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
@CrossOrigin(origins = "*") // allow frontend dev CORS
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public List<TodoRes> getAll() {
        return service.getAll();
    }

    @PostMapping
    public TodoRes create(@RequestBody CreateTodoReq todo) {
        return service.create(todo);
    }

    @PatchMapping("/{id}")
    public TodoRes update(@PathVariable String id, @RequestBody UpdateTodoReq patch) {
        return service.update(id, patch);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @DeleteMapping
    public void clearAll() {
        service.clearAll();
    }
}
