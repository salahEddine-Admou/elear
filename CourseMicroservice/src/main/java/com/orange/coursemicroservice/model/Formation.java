package com.orange.coursemicroservice.model;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.List;
@Data
@Document(collection = "formation")
public class Formation {

    @Id
    private String id;
    private String nom;
    private String titre;
    private String description;
    private String instructeur;
    private String contenu;

    private String photo;
    private String langue;
    private String localisation;
    private List<Module> modules;
}
