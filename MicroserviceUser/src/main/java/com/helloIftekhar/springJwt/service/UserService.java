package com.helloIftekhar.springJwt.service;

import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User user) throws UserAlreadyExistsException {
        if (userAlreadyExists(user.getEmail())){
            throw  new UserAlreadyExistsException(user.getEmail()+ " already exists!");
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, String id) {
        return userRepository.findById(id).map(st -> {
            st.setFirstName(user.getFirstName());
            st.setLastName(user.getLastName());
            st.setNiveau(user.getNiveau());
            st.setEmail(user.getEmail());
            st.setAddress(user.getAddress());
            st.setDatebirth(user.getDatebirth());
            st.setPassword(user.getPassword());
            st.setValidation(user.getValidation());
            st.setAction(user.getAction());
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