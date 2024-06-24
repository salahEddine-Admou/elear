package com.helloIftekhar.springJwt.controller;



import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.service.UserAlreadyExistsException;
import com.helloIftekhar.springJwt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {


    @Autowired
    private UserService userService;


    @GetMapping

    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(
                userService.getUsers(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) throws UserAlreadyExistsException {
        return userService.addUser(user);
    }


    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody User user, @PathVariable String id) {
        System.out.println("hello");
        return userService.updateUser(user, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);

    }


    @DeleteMapping("/user/{ids}")
    public ResponseEntity<String> deleteUsersByIds(@PathVariable List<String> ids) {
        for (String id : ids) {
            if (userService.existsById(id)) {userService.deleteUserById(id);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }



}






