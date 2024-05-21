package com.helloIftekhar.springJwt.controller;


import com.helloIftekhar.springJwt.model.*;
import com.helloIftekhar.springJwt.repository.CertificatRepo;
import com.helloIftekhar.springJwt.service.FormationService;
import com.helloIftekhar.springJwt.service.JwtService;
import com.helloIftekhar.springJwt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
    @Autowired
    private CertificatRepo certificatRepo;
    @PostMapping("/add")
    public ResponseEntity<Object> createFormation(@RequestBody Formation formation) {
        Formation createdFormation = formationService.CreateFormation(formation);

        if (createdFormation == null) {
            String message = "Une formation avec le même titre existe déjà : " + formation.getTitle();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFormation);
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
    @PutMapping("/UpdateModule/{idModule}")
    public ResponseEntity<MyModule> updateModule(@PathVariable String idModule, @RequestBody MyModule module) {
        MyModule module1 = formationService.updateModule(idModule, module);

        if (module1 != null) {
            return new ResponseEntity<>(module1, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/UpdateSubModule/{idSubModule}")
    public ResponseEntity<Submodule> updateModule(@PathVariable String idSubModule, @RequestBody Submodule submodule) {
        Submodule submodule1 = formationService.updateSub(idSubModule, submodule);

        if (submodule1 != null) {
            return new ResponseEntity<>(submodule1, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable String id) {
        boolean deleted = formationService.deleteFormation(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("DeleteModule/{idFormation}/{idModule}")
    public ResponseEntity<Void> deleteModule(@PathVariable String idModule,@PathVariable String idFormation) {
        boolean deleted = formationService.deleteModule(idModule,idFormation);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("DeleteSubModule/{idModule}/{idSub}")
    public ResponseEntity<Void> deleteSub(@PathVariable String idModule,@PathVariable String idSub) {
        boolean deleted = formationService.deleteSubmodule(idModule,idSub);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
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

    @PostMapping ("/{idFormation}/addModule/")
    public ResponseEntity<?> addMod(@PathVariable String idFormation, @RequestBody MyModule module) {
        System.out.println("gggggg");
        MyModule module1 = formationService.addModuleToFormation(idFormation, module);

        if (module1 == null) {
            String message = "Le module n'a pas été ajouté à la formation avec l'ID : " + idFormation;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping ("getModules/{idFormation}/{idUser}")
    public List<MyModule> gettt(@PathVariable String idFormation, @PathVariable String idUser) {
        List<FormationModule> modules = formationService.getModulesForFormation(idFormation,idUser);
        List<MyModule> modules2 = new ArrayList<>();
        for (FormationModule module : modules) {
            modules2.add(module.getMyModule());
        }
        return modules2;
    }

    @GetMapping ("getModulesAdmin/{idFormation}")
    public List<MyModule> gettt(@PathVariable String idFormation) {
        List<MyModule> modules2 = formationService.getModulesForFormationAdmin(idFormation);

        return modules2;
    }
    @GetMapping ("getState/{idFormation}/{idUser}/{idModule}/{idSub}")
    public  Boolean getttS(@PathVariable String idFormation, @PathVariable String idUser, @PathVariable String idModule, @PathVariable String idSub) {
        Boolean s = formationService.getStateM(idFormation,idUser,idModule, idSub);

       return s;
    }
    @GetMapping ("changeState/{idFormation}/{idModule}/{idSub}/{idUser}")
    public  Boolean getttSC(@PathVariable String idFormation, @PathVariable String idUser, @PathVariable String idModule, @PathVariable String idSub) {
        Boolean s = formationService.changeStateM(idFormation,idUser,idModule ,idSub);

        return s;
    }
    @PostMapping("{idFormation}/{idModule}/addSubmodule")
    public ResponseEntity<?> addSub(@RequestBody Submodule submodule,@PathVariable String idModule,@PathVariable String idFormation){
        Submodule submodule1 = formationService.addSubtitleToModule(idFormation,idModule,  submodule);
        if (submodule1 == null) {
            String message = "Le subModule n'a pas été ajouté à la formation avec l'ID : " + idModule;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @GetMapping ("getSubmodules/{idModule}")
    public List<Submodule> gett(@PathVariable String idModule) {
        List<Submodule> submodules = formationService.getSubtitlesForModule(idModule);
        return submodules;
    }
    @PostMapping("/{formation}/enroll")
    public ResponseEntity<?> enrollToFormation(@PathVariable("formation") String formationName, @RequestParam("id") String userId,@RequestHeader("Authorization") String authorizationHeader) {


        String userIdFromToken = jwtTokenProvider.getUserIdFromToken(authorizationHeader);
System.out.println(userIdFromToken);
        Formation formation = formationService.getFormationByName(formationName);
        System.out.println(formation);
        if (formation == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("La formation spécifiée n'existe pas.");
        }
        User user = userService.getUserById(userIdFromToken);
System.out.println(user);
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

    @GetMapping("/getCertificatsFinish/{idUser}")
    public ResponseEntity<List<Certificat>> getCertificatsFinish(@PathVariable String idUser){
        List<Certificat> Cerificats = formationService.getCertificatsFinish(idUser);
        return new ResponseEntity<>(Cerificats,HttpStatus.OK);
    }
    @GetMapping("/getCertificatsCurrent/{idUser}")
    public ResponseEntity<List<Certificat>> getCertificatsCurrent(@PathVariable String idUser){
        List<Certificat> Cerificats = formationService.getCertificatsCurrent(idUser);
        return new ResponseEntity<>(Cerificats,HttpStatus.OK);
    }
    @GetMapping(value = "/download/{certificatId}")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable String certificatId) {
        Optional<Certificat> certificatOpt = certificatRepo.findById(certificatId);
        if (certificatOpt.isPresent()) {
            Certificat certificat = certificatOpt.get();
            Binary imageData = certificat.getPdfData(); // Assuming this method actually returns image data
            if (imageData != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG) // Ensure this matches your image's format
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +"Certificat de " +certificat.getFormation().getTitle() + ".png\"") // Forces download
                        .body(imageData.getData());
            }
        }
        return ResponseEntity.notFound().build();
    }

}