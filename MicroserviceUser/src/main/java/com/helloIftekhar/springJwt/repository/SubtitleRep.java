package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Submodule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubtitleRep extends MongoRepository<Submodule, String> {
}