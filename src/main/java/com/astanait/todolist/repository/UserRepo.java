package com.astanait.todolist.repository;


import com.astanait.todolist.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
    UserEntity findByPassword(String password);
}
