package com.helloIftekhar.springJwt.service;

import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.InscriptionFormation;
import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.repository.Formationrepository;
import com.helloIftekhar.springJwt.repository.InscriptionFormationRepository;
import com.helloIftekhar.springJwt.repository.TokenRepository;
import com.helloIftekhar.springJwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final Formationrepository formationRepository;
    private final PasswordEncoder passwordEncoder;
    private  final InscriptionFormationRepository inscriptionFormationRepository;
    private TokenRepository tokenRepository;
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
}
