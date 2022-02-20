package com.astanait.todolist.service;


import com.astanait.todolist.entity.TodoEntity;
import com.astanait.todolist.entity.UserEntity;
import com.astanait.todolist.exception.TaskNotFoundException;
import com.astanait.todolist.exception.UserNotFoundException;
import com.astanait.todolist.model.Todo;
import com.astanait.todolist.repository.TodoRepo;
import com.astanait.todolist.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    TodoRepo todoRepo;

    @Autowired
    UserRepo userRepo;

    public Todo createTodo(TodoEntity entity, Long userId) throws UserNotFoundException {
        UserEntity user = userRepo.findById(userId).isPresent() ? userRepo.findById(userId).get() : null;
        if (user == null) {
            throw new UserNotFoundException("Пользователь не был найден");
        }
        entity.setUser(user);
        return Todo.toModel(todoRepo.save(entity));
    }

    public Todo completeTodo(Long id) throws TaskNotFoundException  {
        TodoEntity todo = todoRepo.findById(id).isPresent() ? todoRepo.findById(id).get() : null;
        if (todo == null) {
            throw new TaskNotFoundException("Таск не был найден");
        }
        todo.setCompleted(!todo.getCompleted());
        return Todo.toModel(todoRepo.save(todo));
    }

    public Todo deleteTodo(Long id) throws TaskNotFoundException  {
        TodoEntity todo = todoRepo.findById(id).isPresent() ? todoRepo.findById(id).get() : null;
        if (todo == null) {
            throw new TaskNotFoundException("Таск не был найден");
        }
        todoRepo.delete(todo);
        return Todo.toModel(todo);
    }
}
