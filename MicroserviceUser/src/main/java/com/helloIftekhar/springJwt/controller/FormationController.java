package com.helloIftekhar.springJwt.controller;


import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Subtitle;
import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.service.FormationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/formations")
@RequiredArgsConstructor
public class FormationController {
    @Autowired
    private FormationService formationService;
    @PostMapping("/add")
    public ResponseEntity<Formation> createFormation(@RequestBody Formation formation){

        Formation CreatedFormation = formationService.CreateFormation(formation);
        return new ResponseEntity<>(CreatedFormation, HttpStatus.CREATED);
    }
    @PostMapping("/AddModule/{id}")
    public Formation InFor(@RequestBody MyModule module, @PathVariable String id){
        System.out.println("hii");
        return formationService.AddMod(id,module);
    }
    @PostMapping("/AddSubtitle/{id}/{nameModule}")
    public Formation InSub(@RequestBody Subtitle subtitle, @PathVariable String id, @PathVariable String nameModule){
        System.out.println("hii");
        return formationService.AddSub(id,nameModule,subtitle);
    }
    @GetMapping("/getFormations/current/{id}")
    public ResponseEntity<List<Formation>> getAllFormationsCurrent(@PathVariable String id){
        List<Formation> formations = formationService.getAllFormationsCurrent(id);
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/getFormations/finish/{id}")
    public ResponseEntity<List<Formation>> getAllFormationsFinish(@PathVariable String id){
        List<Formation> formations = formationService.getAllFormationsFinish(id);
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/getFormations/more")
    public ResponseEntity<List<Formation>> getAllFormationsMore(){
        List<Formation> formations = formationService.getAllFormationsMore();
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
    @GetMapping("getProgress/{id}/{name}")
    public Integer getpro(@PathVariable String id, @PathVariable String name) {
        return  formationService.getProgress(id,name);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable String id, @RequestBody Formation formation) {
        formationService.updateFormation(id, formation);

            return new ResponseEntity<>( HttpStatus.OK);

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