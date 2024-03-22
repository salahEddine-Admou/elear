package com.helloIftekhar.springJwt.controller;


import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.service.IUserService;
import com.helloIftekhar.springJwt.service.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.FOUND);
    }

    @PostMapping
    public User addUser(@RequestBody User user) throws UserAlreadyExistsException {
        return userService.addUser(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody User user, @PathVariable String id){
        return userService.updateUser(user, id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id){
        userService.deleteUser(id);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable String id){
        return userService.getUserById(id);
    }


}
