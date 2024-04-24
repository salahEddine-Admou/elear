package com.helloIftekhar.springJwt.repository;


import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface Formationrepository extends MongoRepository<Formation, String> {

    @Query("{'state' : finish }")
    List<Formation> findAllFinish();

    @Query("{'state' : not_registred }")
    List<Formation> findAllMore();

    @Query("{'title' : ?0 }")
    Formation findByTitle(String title);
}
