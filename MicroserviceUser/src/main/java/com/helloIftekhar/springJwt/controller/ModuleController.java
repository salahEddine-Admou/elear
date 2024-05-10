package com.helloIftekhar.springJwt.controller;

import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Submodule;
import com.helloIftekhar.springJwt.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
public class ModuleController {
    private final ModuleService moduleService;

    @GetMapping
    public ResponseEntity<List<MyModule>> getAllModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @PostMapping
    public ResponseEntity<MyModule> createModule(@RequestBody MyModule module) {
        return ResponseEntity.ok(moduleService.createModule(module));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MyModule> updateModule(@PathVariable String id, @RequestBody MyModule module) {
        MyModule updatedModule = moduleService.updateModule(id, module);
        if (updatedModule == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedModule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable String id) {
        if (moduleService.deleteModule(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{moduleId}/submodules")
    public ResponseEntity<Submodule> addSubmodule(@PathVariable String moduleId, @RequestBody Submodule submodule) {
        Submodule createdSubmodule = moduleService.addSubmodule(moduleId, submodule);
        if (createdSubmodule == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(createdSubmodule);
    }

    @GetMapping("/{moduleId}/submodules")
    public ResponseEntity<List<Submodule>> getSubmodules(@PathVariable String moduleId) {
        List<Submodule> submodules = moduleService.getSubmodulesForModule(moduleId);
        if (submodules == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(submodules);
    }
}
