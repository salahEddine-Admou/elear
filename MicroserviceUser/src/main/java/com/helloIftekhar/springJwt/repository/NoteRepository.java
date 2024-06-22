package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.ModuleSubModule;
import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
    @Query("{'user.id' : ?0,'formation.id' : ?1}")
    Note findByNotes(String userId,String formationId);
}
