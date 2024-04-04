package com.helloIftekhar.springJwt.repository;


import com.helloIftekhar.springJwt.model.Formation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Formationrepository extends MongoRepository<Formation, String> {
}
