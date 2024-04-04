package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document
@Data
public class Module {
    private String id;
    private String title;
    private String content;
    private List<Question> questions;

}
