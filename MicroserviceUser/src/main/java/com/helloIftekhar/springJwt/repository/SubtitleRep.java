package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Subtitle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubtitleRep extends MongoRepository<Subtitle, String> {
}
