package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
@Document(collection = "Question")
@Data
public class Question {
    private String id;
    private String questionText;
    @DocumentReference(collection = "Option")
    private List<Option> options;
    private int correctOption;
}
