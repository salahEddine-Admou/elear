package com.helloIftekhar.springJwt.model;

import lombok.Data;
import lombok.Setter;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
@Data
@Document(collection = "formation")
public class Formation {

    @Id
    private String id;
    private String title;
    private String domaine;
    private String description;
    private String photo;
    private String date;
    private String localisation;
    private String instructor;
    private String level;
    @DocumentReference(collection = "module")
    List<MyModule> modules;
    @DocumentReference(collection = "TestFinal")
    TestFinal testFinal;

    //@Getter
    //@Setter
    //private List<User> enrolledUsers;

    //public List<User> getUsers() {
       // return enrolledUsers;
    //}
}
