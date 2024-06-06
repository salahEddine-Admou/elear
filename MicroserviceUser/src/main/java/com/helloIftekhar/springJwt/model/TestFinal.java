package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "TestFinal")
@Data
public class TestFinal {
    private String id;
    private String title;
    @DocumentReference(collection = "Question")
    private List<Question> questions;
    private int timeLimit;
    private double passingScore;
}
