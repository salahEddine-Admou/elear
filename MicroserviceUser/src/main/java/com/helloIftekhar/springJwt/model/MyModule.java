package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document
@Data
public class MyModule {
    private String id;
    private String title;
    private Boolean stateM;
    private Integer progress;
    private  List<Subtitle> subtitles;


}
