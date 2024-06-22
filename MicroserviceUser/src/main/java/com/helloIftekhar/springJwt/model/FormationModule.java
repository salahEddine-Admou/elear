package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

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
    @DocumentReference(collection = "moduleSubModule")
    List<ModuleSubModule> moduleSubModules;
    private String state;

}
