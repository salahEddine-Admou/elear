package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Option;
import com.helloIftekhar.springJwt.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends MongoRepository<Option, String> {
}
