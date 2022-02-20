package com.astanait.todolist.repository;


import com.astanait.todolist.entity.TodoEntity;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepo extends CrudRepository<TodoEntity, Long> { }
