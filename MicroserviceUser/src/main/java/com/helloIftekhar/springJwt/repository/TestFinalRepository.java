package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Quiz;
import com.helloIftekhar.springJwt.model.TestFinal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestFinalRepository extends MongoRepository<TestFinal, String> {
    @Query("{'title' : ?0}")
    TestFinal findByTitle(String name);
}
