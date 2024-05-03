package com.helloIftekhar.springJwt.controller;


import com.helloIftekhar.springJwt.model.*;
import com.helloIftekhar.springJwt.service.FormationService;
import com.helloIftekhar.springJwt.service.JwtService;
import com.helloIftekhar.springJwt.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/formations")
@RequiredArgsConstructor
public class FormationController {
    @Autowired
    private FormationService formationService;
    @Autowired
    private UserService userService;
    @Autowired
    private final JwtService jwtTokenProvider;
    @PostMapping("/add")
    public ResponseEntity<Object> createFormation(@RequestBody Formation formation) {
        Formation createdFormation = formationService.CreateFormation(formation);

        if (createdFormation == null) {
            String message = "Une formation avec le même titre existe déjà : " + formation.getTitle();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFormation);
    }

    @GetMapping("/getAllFormations")
    public ResponseEntity<?> getAllFormations() {
        List<Formation> formations = formationService.getAllFormations();
        if (formations == null || formations.isEmpty()) {
            String message = "Aucune formation n'a été trouvée.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(formations);
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
        Formation formation1 = formationService.updateFormation(id, formation);

        if (formation1 != null) {
            return new ResponseEntity<>(formation1, HttpStatus.OK);
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
    @GetMapping("/getFormations/current/{idUser}")
    public ResponseEntity<?> getAllFormationsCurrent(@PathVariable String idUser) {
        List<InscriptionFormation> formations = formationService.getAllFormationsCurrent(idUser);
        if (formations == null) {
            String message = "Aucune inscription de formation trouvée pour l'utilisateur avec l'ID : " + idUser;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(formations);
    }

    @GetMapping("/getFormations/finish/{idUser}")
    public ResponseEntity<List<InscriptionFormation>> getAllFormationsFinish(@PathVariable String idUser){
        List<InscriptionFormation> formations = formationService.getAllFormationsFinish(idUser);
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/getFormations/more")
    public ResponseEntity<List<Formation>> getAllFormationsMore(){
        List<Formation> formations = formationService.getAllFormationsMore();
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }

    @PostMapping ("addModule/{idFormation}")
    public ResponseEntity<?> addMod(@PathVariable String idFormation, @RequestBody MyModule module) {
        MyModule module1 = formationService.addModuleToFormation(idFormation, module);

        if (module1 == null) {
            String message = "Le module n'a pas été ajouté à la formation avec l'ID : " + idFormation;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping ("getModules/{idFormation}")
    public List<MyModule> gettt(@PathVariable String idFormation) {
        List<MyModule> modules = formationService.getModulesForFormation(idFormation);
        return modules;
    }
    @PostMapping("addSubtitle/{idModule}")
    public ResponseEntity<?> addSub(@RequestBody Subtitle subtitle, @PathVariable String idModule){
        Subtitle subtitle1 = formationService.addSubtitleToModule(idModule,subtitle);
        if (subtitle1 == null) {
            String message = "Le subModule n'a pas été ajouté à la formation avec l'ID : " + idModule;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @GetMapping ("getSubtitles/{idModule}")
    public List<Subtitle> gett(@PathVariable String idModule) {
        List<Subtitle> subtitles = formationService.getSubtitlesForModule(idModule);
        return subtitles;
    }
    @GetMapping("/InscriptionFormation/{idUser}/{NameF}")
    public ResponseEntity<?> InFor(@PathVariable String idUser, @PathVariable String NameF) {
        InscriptionFormation inscriptionFormation = formationService.InscriptionFormation(idUser, NameF);

        if (inscriptionFormation == null) {
            String message = "L'inscription à la formation pour l'utilisateur avec l'ID : " + idUser + " n'a pas été effectue.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(inscriptionFormation);
    }



    @PostMapping("/{formation}/enroll")
    public ResponseEntity<?> enrollToFormation(@PathVariable("formation") String formationName, @RequestParam("id") String userId,@RequestHeader("Authorization") String authorizationHeader) {


        String userIdFromToken = jwtTokenProvider.getUserIdFromToken(authorizationHeader);

        Formation formation = formationService.getFormationByName(formationName);

        if (formation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("La formation spécifiée n'existe pas.");
        }
        User user = userService.getUserById(userIdFromToken);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("L'utilisateur spécifié n'existe pas.");
        }
        InscriptionFormation inscriptionFormation = formationService.enrollUserToFormation(formation, user);
        if (inscriptionFormation == null) {
            String message = "L'inscription à la formation pour l'utilisateur avec l'ID  n'a pas été effectue.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        else {
            String enrollLink = "http://localhost:8080/formations/" + formation + "/enroll?id=" + userId;
            return ResponseEntity.ok(enrollLink);
        }
    }

}