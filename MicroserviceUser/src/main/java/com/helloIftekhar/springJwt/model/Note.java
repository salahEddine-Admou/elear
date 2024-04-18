package com.helloIftekhar.springJwt.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document
@Data
public class Note {
    private String id;
    private String Text;

}
