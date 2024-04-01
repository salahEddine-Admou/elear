package com.helloIftekhar.springJwt.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;

    @Field(name = "firstname")
    private String firstName;

    @Field(name = "last_name")
    private String lastName;

    @Field(name = "username")
    private String username;

    @Field(name = "password")
    private String password;

    @Field(name = "niveau")
    private String niveau;

    @Field(name = "email")
    private String email;

    @Field(name = "address")
    private String address;

    @Field(name = "date")
    private String date;

    @Field(name = "role")
    private Role role;

    @Field(name = "tokens")
    private List<Token> tokens;

    public User(String firstName, String lastName, String username, String niveau, String email, String address, String date, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.niveau = niveau;
        this.email = email;
        this.address = address;
        this.date = date;
        this.role = role;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }




}
