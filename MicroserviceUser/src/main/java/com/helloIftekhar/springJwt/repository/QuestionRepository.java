package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Question;
import com.helloIftekhar.springJwt.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
}
