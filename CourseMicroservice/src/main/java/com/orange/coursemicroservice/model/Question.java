package com.orange.coursemicroservice.model;

import lombok.Data;

import java.util.List;

@Data
public class Question {
    private String id;
    private String questionText;
    private List<String> options;
    private int correctOption;
}
