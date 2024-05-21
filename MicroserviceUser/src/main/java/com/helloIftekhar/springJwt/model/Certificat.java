package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "Certificat")
public class Certificat {
    @Id
    private String id;
    private User user;
    private Formation formation;
    @Field("pdfData")
    private Binary pdfData;
    private String stateCert;
    private Integer progress;
}
