package com.orange.coursemicroservice.repository;

import com.orange.coursemicroservice.model.Formation;
import org.springframework.data.mongodb.core.MongoAdminOperations;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Formationrepository extends MongoRepository<Formation, String> {
}
