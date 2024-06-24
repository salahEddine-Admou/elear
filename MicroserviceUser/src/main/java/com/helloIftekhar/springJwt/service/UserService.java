
package com.helloIftekhar.springJwt.service;
import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.repository.Formationrepository;
import com.helloIftekhar.springJwt.repository.InscriptionFormationRepository;
import com.helloIftekhar.springJwt.repository.TokenRepository;
import com.helloIftekhar.springJwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.*;

import static java.sql.JDBCType.NUMERIC;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final Formationrepository formationRepository;
    private final PasswordEncoder passwordEncoder;
    private  final InscriptionFormationRepository inscriptionFormationRepository;
    private TokenRepository tokenRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User user) throws UserAlreadyExistsException {
        if (userAlreadyExists(user.getEmail())){
            throw  new UserAlreadyExistsException(user.getEmail()+ " already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, String id) {
        System.out.println("hello");
        return userRepository.findById(id).map(st -> {
            System.out.println(st);
            st.setFullName(user.getFullName());
            st.setEmail(user.getEmail());
            st.setDate(user.getDate());
            st.setProfession(user.getProfession());
            st.setSpeciality(user.getSpeciality());
            st.setUniversity(user.getUniversity());
            st.setCountry(user.getCountry());
            st.setLinkedinUrl(user.getLinkedinUrl());
            st.setProfilePicture(user.getProfilePicture());
            return userRepository.save(st);
        }).orElseThrow(() -> new UserNotFoundException("Sorry, this user could not be found"));
    }


    @Override
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Sorry, no user found with the Id :" +id));
    }


    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException("Sorry, user not found");
        }
        userRepository.deleteById(id);
    }

    private boolean userAlreadyExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }


    public boolean existsById(String userId) {
        return userRepository.existsById(userId);
    }

    public void deleteUserById(String userId) {
        userRepository.deleteById(userId);
    }


}

