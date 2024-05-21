package com.helloIftekhar.springJwt.DTO;

import lombok.Data;

@Data
public class ProgressDTO {
    private String formationId;
    private int totalModules;
    private int completedModules;
}
