package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@Document(collection = "module")
public class MyModule {
    private String id;
    private String title;
    private Boolean stateM;
    @DocumentReference(collection = "formation")
    private Formation formation;
    @DocumentReference(collection = "subtitle")
    List<Subtitle> subtitles;
}
