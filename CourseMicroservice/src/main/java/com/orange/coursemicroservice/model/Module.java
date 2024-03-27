package com.orange.coursemicroservice.model;
import java.util.List;
import lombok.Data;

@Data
public class Module {
    private String id;
    private String title;
    private String content;
    private List<Question> questions;

}
