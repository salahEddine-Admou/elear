package com.helloIftekhar.springJwt.model;

public class AuthenticationResponse {
    private String token;
    private Role message;
    private String id;


    public AuthenticationResponse(String token, Role message, String id) {
        this.token = token;
        this.message = message;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public Role getMessage() {
        return message;
    }

    public String getId() {
        return id;
    }
}
