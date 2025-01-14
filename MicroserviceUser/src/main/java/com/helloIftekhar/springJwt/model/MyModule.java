package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@Document(collection = "module")
public class MyModule {
    private String id;
    private String name;
    @DocumentReference(collection = "submodule")
    List<Submodule> submodules;
    @DocumentReference(collection = "Quiz")
    Quiz quiz;
}
