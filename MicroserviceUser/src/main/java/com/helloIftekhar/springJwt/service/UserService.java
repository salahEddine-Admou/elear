package com.helloIftekhar.springJwt.service;

import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.repository.Formationrepository;
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
        return userRepository.findById(id).map(st -> {
            st.setFullName(user.getFullName());
            st.setEmail(user.getEmail());
            st.setDate(user.getDate());
            return userRepository.save(st);
        }).orElseThrow(() -> new UserNotFoundException("Sorry, this user could not be found"));
    }

    @Override
    public User InscriptionFormation(String id, String titlee) {
        return
        userRepository.findById(id)
                .map(st -> {
           Formation f = formationRepository.findByTitle(titlee);
            f.setState("current");
            if (st.getFormations() == null) {
                st.setFormations(new ArrayList<>()); // Créer une nouvelle liste si elle est null
            }
            st.getFormations().add(f); // Ajouter la formation à la liste

            return userRepository.save(st);
        }).orElseThrow(() -> new UserNotFoundException("Sorry, this user could not be found"));
    }

    @Override
    public Void Finir(String id,String nameFormation) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Parcourir les formations de l'utilisateur pour trouver celle avec l'ID correspondant
            for (Formation formation : user.getFormations()) {
                if (formation.getTitle().equals(nameFormation)) {
                    System.out.println(formation.getTitle());
                    System.out.println(nameFormation);
                    // Modifier l'état de la formation
                    formation.setState("finish");
                    System.out.println(formation);
                    // Enregistrer les modifications dans la base de données
                    formationRepository.save(formation);
                    userRepository.save(user);
                    break; // Sortir de la boucle une fois la formation trouvée et modifiée
                }
            }
        }
        return null;
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
