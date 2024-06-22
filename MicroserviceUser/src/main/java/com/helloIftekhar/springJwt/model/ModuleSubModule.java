package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
@Data
@Document(collection = "moduleSubModule")
public class ModuleSubModule {
    @Id
    private String id;
    @DocumentReference(collection = "submodule")
    private Submodule submodule;
    private String stateM;
}
