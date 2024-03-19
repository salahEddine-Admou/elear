package com.orange.microserviceuser.model;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document (collection = Professeur)
public class Professeur {
    @Id
    private int id;
    private String 

}
