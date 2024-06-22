package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Submodule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmoduleRep extends MongoRepository<Submodule, String> {
    @Query("{'title' : ?0}")
    Submodule findByName(String name);
}
