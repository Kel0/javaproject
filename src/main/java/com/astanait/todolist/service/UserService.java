package com.astanait.todolist.service;


import com.astanait.todolist.entity.UserEntity;
import com.astanait.todolist.exception.CredentialsNotCorrectException;
import com.astanait.todolist.exception.UserAlreadyExistException;
import com.astanait.todolist.exception.UserNotFoundException;
import com.astanait.todolist.model.User;
import com.astanait.todolist.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User registration(UserEntity user) throws UserAlreadyExistException {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistException("Пользователь уже существует");
        }
        return User.toModel(userRepo.save(user));
    }

    public User login(UserEntity user) throws UserNotFoundException, CredentialsNotCorrectException {
        UserEntity entity = userRepo.findByUsername(user.getUsername());
        if (entity == null) {
            throw new UserNotFoundException("Пользователь не был найден");
        }
        System.out.print(entity);
        System.out.print(user);
        if (!Objects.equals(entity.getPassword(), user.getPassword())) {
            throw new CredentialsNotCorrectException("Не правильный логин или пароль.");
        }
        return User.toModel(entity);
    }

    public User getOne(Long id) throws UserNotFoundException {
        UserEntity user = userRepo.findById(id).isPresent() ? userRepo.findById(id).get() : null;
        if (user == null) {
            throw new UserNotFoundException("Пользователь не был найден");
        }
        return User.toModel(user);
    }

    public User deleteUser(Long id) throws UserNotFoundException {
        UserEntity user = userRepo.findById(id).isPresent() ? userRepo.findById(id).get() : null;
        if (user == null) {
            throw new UserNotFoundException("Пользователь не был найден");
        }
        userRepo.delete(user);
        return User.toModel(user);
    }
}
