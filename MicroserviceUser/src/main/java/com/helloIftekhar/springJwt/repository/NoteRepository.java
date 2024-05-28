package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.ModuleSubModule;
import com.helloIftekhar.springJwt.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
}
