package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Quiz;
import com.helloIftekhar.springJwt.model.Submodule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    @Query("{'title' : ?0}")
    Quiz findByTitle(String name);
}
