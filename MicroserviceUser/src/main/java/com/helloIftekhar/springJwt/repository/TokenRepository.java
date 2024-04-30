package com.helloIftekhar.springJwt.repository;

import com.helloIftekhar.springJwt.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TokenRepository extends MongoRepository<Token, String> {

    @Query("{ 'userId.id' : ?0, 'loggedOut' : false }")
    List<Token> findAllTokensByUser(String userId);
    @Query("{ 'userId.id' : ?0, 'loggedOut' : true}")
    Token findTokensByUser(String userId);

    Optional<Token> findByToken(String token);

}
