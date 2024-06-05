package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@Document(collection = "Quiz")
public class Quiz {
    private String id;
    private String title;
    @DocumentReference(collection = "Question")
    private List<Question> questions;


}
