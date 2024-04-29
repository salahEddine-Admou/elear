package com.helloIftekhar.springJwt.service;

import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface IUserService {
    User addUser(User user) throws UserAlreadyExistsException;
    List<User> getUsers();

    User updateUser(User user, String id);
    User InscriptionFormation(String id, String titlee);
    User getUserById(String id);

    void deleteUser(String id);


}


