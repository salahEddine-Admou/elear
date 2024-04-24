package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String langue;
    private String localisation;
    private String state;
    private Integer progress;
    private List<MyModule> modules;
}
