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

    @Field(name = "full_name")
    private String fullName;

    @Field(name = "username")
    private String username;

    @Field(name = "password")
    private String password;

    @Field(name = "email")
    private String email;

    @Field(name = "date")
    private String date;

    @Field(name = "role")
    private Role role;

    @Field(name = "tokens")
    private List<Token> tokens;

    @Field(name= "speciality")
    private String speciality;

    @Field(name= "profession")
    private String profession;

    @Field(name= "university")
    private String university;

    @Field(name="linkedinUrl")
    private String linkedinUrl;

    @Field(name = "country")
    private String country;

    @Field(name = "profile_picture")
    private String profilePicture;

    public User(String fullName, String username, String email, String date, Role role, String speciality, String university,String linkedinUrl,String profession,String country,String profilePicture) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.date = date;
        this.role = role;
        this.speciality =speciality;
        this.university = university;
        this.profession = profession;
        this.linkedinUrl = linkedinUrl;
        this.country = country;
        this.profilePicture = profilePicture;

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
