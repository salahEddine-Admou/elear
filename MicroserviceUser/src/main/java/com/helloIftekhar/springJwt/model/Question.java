package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document
@Data
public class Question {
    private String id;
    private String questionText;
    private List<String> options;
    private int correctOption;
}
