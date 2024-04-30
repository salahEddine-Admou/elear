package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.InscriptionFormation;
import com.helloIftekhar.springJwt.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface InscriptionFormationRepository extends MongoRepository<InscriptionFormation, String> {
    @Query("{'user.id' : ?0, 'state': ?1 }")
    List<InscriptionFormation> findByUserAndState(String user, String state);
    @Query("{'user.id' : ?0 }")
    List<InscriptionFormation> findByUser(User user);
    @Query("{'user.d' : ?0, 'formation.id': ?1 }")
    InscriptionFormation findByUserFormation(String user,String formation);
}
