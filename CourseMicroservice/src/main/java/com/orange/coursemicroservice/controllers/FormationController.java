package com.orange.coursemicroservice.controllers;

import com.orange.coursemicroservice.model.Formation;
import com.orange.coursemicroservice.services.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formations")
public class FormationController {
    @Autowired
    private FormationService formationService;
    @PostMapping
    public ResponseEntity<Formation> createFormation(@RequestBody Formation formation){
        Formation CreatedFormation = formationService.CreateFormation(formation);
        return new ResponseEntity<>(CreatedFormation, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Formation>> getAllFormations(){
        List<Formation> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable String id) {
        Formation formation = formationService.getFormationById(id);
        if (formation != null) {
            return new ResponseEntity<>(formation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable String id, @RequestBody Formation formation) {
        Formation updatedFormation = formationService.updateFormation(id, formation);
        if (updatedFormation != null) {
            return new ResponseEntity<>(updatedFormation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable String id) {
        boolean deleted = formationService.deleteFormation(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}