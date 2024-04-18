package com.helloIftekhar.springJwt.model;

public class AuthenticationResponse {
    private String token;
    private Role message;

    public AuthenticationResponse(String token, Role message) {
        this.token = token;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public Role getMessage() {
        return message;
    }
}
