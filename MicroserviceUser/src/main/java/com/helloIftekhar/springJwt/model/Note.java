package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
@Data
@Document(collection = "Note")
public class Note {
    @Id
    private String id;
    @DocumentReference(collection = "User")
    private User user;
    @DocumentReference(collection = "formation")
    private Formation formation;
    private String Text;

}
