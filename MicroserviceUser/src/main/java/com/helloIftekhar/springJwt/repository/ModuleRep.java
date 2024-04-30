package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRep extends MongoRepository<MyModule, String> {
    @Query("{'formation.id' : ?0}")
    List<MyModule> findByIdFormation(String id);
}
