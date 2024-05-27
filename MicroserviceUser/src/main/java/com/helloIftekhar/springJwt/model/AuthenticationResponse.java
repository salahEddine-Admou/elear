package com.helloIftekhar.springJwt.model;

public class AuthenticationResponse {
    private String token;
    private Role message;
    private String id;

    private String fullName;

    public AuthenticationResponse(String token, Role message, String id, String fullName) {
        this.token = token;
        this.message = message;
        this.id = id;
        this.fullName = fullName;
    }

    public String getToken() {
        return token;
    }

    public Role getMessage() {
        return message;
    }

    public String getFullName() {
        return fullName;
    }

    public String getId() {
        return id;
    }
}
