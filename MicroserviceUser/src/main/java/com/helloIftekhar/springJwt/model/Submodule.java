package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "submodule")
@Data
public class Submodule {
    private String id;
    private String title;
    private String duree;
    private String contenu;
    private List<Question> questions;
    private List<Note> notes;
}

