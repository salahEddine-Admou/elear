package com.helloIftekhar.springJwt.controller;


import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.service.FormationService;
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
    @PostMapping("/add")
    public ResponseEntity<Formation> createFormation(@RequestBody Formation formation){
        Formation CreatedFormation = formationService.CreateFormation(formation);
        return new ResponseEntity<>(CreatedFormation, HttpStatus.CREATED);
    }
    @GetMapping("/getFormations/current")
    public ResponseEntity<List<Formation>> getAllFormationsCurrent(){
        List<Formation> formations = formationService.getAllFormationsCurrent();
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/getFormations/finish")
    public ResponseEntity<List<Formation>> getAllFormationsFinish(){
        List<Formation> formations = formationService.getAllFormationsFinish();
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/gett")
    public ResponseEntity<List<Formation>> getAllFormations(){
        List<Formation> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("getById/{id}")
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