package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Certificat;
import com.helloIftekhar.springJwt.model.FormationModule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificatRepo extends MongoRepository<Certificat, String> {
    @Query("{'user.id' : ?0  }")
    List<Certificat> findByUser(String userid, String state);
    @Query("{'user.id' : ?0, 'formation.id' : ?1  }")
    Certificat findByUserFormation(String userid, String formationid);
    @Query("{'user.id' : ?0, 'stateCert' : ?1  }")
    List<Certificat> findByUserState(String userid, String state);

    @Query("{'user.id' : ?0, 'formation.id' : ?1, 'stateCert' : ?2  }")
    Certificat findByUserFormationState(String userid, String formationid, String state);
    @Query(value = "{'formation.id': ?0, 'user.id': ?1}", delete = true)
    void deleteByFormationUser(String formationId,String userId);
}
