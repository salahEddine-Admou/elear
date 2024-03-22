package com.helloIftekhar.springJwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/trainer_only")
    public ResponseEntity<String> trainer() {
        return ResponseEntity.ok("Hello from secured url");
    }

    @GetMapping("/admin_only")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("Hello from admin only url");
    }

    @GetMapping("/user_only")
    public ResponseEntity<String> user() {
        return ResponseEntity.ok("Hello from admin only url");
    }
}
