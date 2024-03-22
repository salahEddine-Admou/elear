package com.helloIftekhar.springJwt.model;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Document(collection = "tokens")
public class Token {

    @Id
    private String id;

    @Field(name = "token")
    private String token;

    @Field(name = "is_logged_out")
    private boolean loggedOut;

    @Field(name = "user_id")
    private User userId;

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }
}
