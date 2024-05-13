package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.ModuleSubModule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleSubRep extends MongoRepository<ModuleSubModule, String> {

    @Query("{'submodule.id' : ?0  }")
    List<ModuleSubModule> findBySub(String sub);
}
