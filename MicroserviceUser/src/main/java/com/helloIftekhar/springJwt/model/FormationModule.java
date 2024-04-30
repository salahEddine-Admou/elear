package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
@Document(collection = "formationModule")
public class FormationModule {
    @Id
    private String id;
    @DocumentReference(collection = "users")
    private User user;
    @DocumentReference(collection = "formation")
    private Formation formation;
    @DocumentReference(collection = "module")
    private MyModule myModule;
    private String state;

}
