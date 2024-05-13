package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.FormationModule;
import com.helloIftekhar.springJwt.model.InscriptionFormation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationModuleRep extends MongoRepository<FormationModule, String> {
    @Query("{'user.id' : ?0, 'formation.id' : ?1  }")
    List<FormationModule> findAllByUser(String user, String formation);
    @Query("{'formation.id' : ?0  }")
    List<FormationModule> findByFormation(String formation);
    @Query("{'formation.id' : ?0, 'myModule.id' : ?1  }")
    List<FormationModule> findByFormationModule(String formation,String module);
    @Query("{ 'formation.id': ?0, 'user.id': ?1, 'myModule.id': ?2}")
    FormationModule getState(String idFormation, String idUser, String idModule);
    @Query("{ 'formation.id': ?0, 'user.id': ?1}")
    FormationModule getStateChange(String idFormation, String idUser);

}
