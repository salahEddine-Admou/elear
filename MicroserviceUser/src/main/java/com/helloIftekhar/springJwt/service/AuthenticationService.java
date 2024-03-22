package com.helloIftekhar.springJwt.service;


import com.helloIftekhar.springJwt.config.CustomLogoutHandler;
import com.helloIftekhar.springJwt.model.AuthenticationResponse;
import com.helloIftekhar.springJwt.model.Role;
import com.helloIftekhar.springJwt.model.Token;
import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.repository.TokenRepository;
import com.helloIftekhar.springJwt.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;
    private final CustomLogoutHandler customLogoutHandler; // Ajout du CustomLogoutHandler

    // Injection de CustomLogoutHandler dans le constructeur
    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager,
                                 CustomLogoutHandler customLogoutHandler) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.customLogoutHandler = customLogoutHandler; // Initialisation de customLogoutHandler
    }

    public String register(User request) {

        // check if user already exist. if exist than authenticate the user
        if(repository.findByUsername(request.getUsername()).isPresent()) {
            return "User already exist";
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        user.setRole(request.getRole());
System.out.println("hii");
        user = repository.save(user);

        String jwt = jwtService.generateToken(user);

       // saveUserToken(jwt, user);

        return "User registration was successful";

    }
    public String log(HttpServletRequest request,
                      HttpServletResponse response,
                      Authentication authentication) {
        customLogoutHandler.logout(request,response,authentication);
        return "logout succ";
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        if (user == null){
            return new AuthenticationResponse(null, "User not found");
        }
        else {
            if(!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
                return new AuthenticationResponse(null, "Wrong password");

            }
            else {
                String jwt = jwtService.generateToken(user);

                revokeAllTokenByUser(user);
                saveUserToken(jwt, user);

                return new AuthenticationResponse(jwt, "User login was successful");

            }
        }

    }
    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if (!validTokens.isEmpty()) {
            System.out.println("La liste validTokens n'est pas vide.");
            for (Token token : validTokens) {
                System.out.println("Token ID: " + token.getId());
                System.out.println("Token: " + token.getToken());
                System.out.println("Logged Out: " + token.isLoggedOut());
                System.out.println("User ID: " + token.getUserId().getId());
                System.out.println("----------------------------------");
            }
        } else {
            System.out.println("La liste validTokens est vide.");
        }
        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t-> {
            t.setLoggedOut(true);
        });

        tokenRepository.saveAll(validTokens);
    }
    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUserId(user);
        tokenRepository.save(token);
       // System.out.println("hello");
    }
}
