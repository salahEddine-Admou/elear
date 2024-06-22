package com.helloIftekhar.springJwt.controller;


import com.helloIftekhar.springJwt.model.*;
import com.helloIftekhar.springJwt.repository.CertificatRepo;
import com.helloIftekhar.springJwt.repository.TestFinalRepository;
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
import java.util.stream.Collectors;

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
    @Autowired
    private TestFinalRepository testFinalRepository;

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
            return  ResponseEntity.status(HttpStatus.OK).body(formation1);
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
    public ResponseEntity<Submodule> updateSubModule(@PathVariable String idSubModule, @RequestBody Submodule submodule) {
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
    @DeleteMapping("/DeleteInscription/{idFormation}/{idUser}")
    public ResponseEntity<Void> deleteFormation(@PathVariable String idFormation,@PathVariable String idUser) {
        boolean deleted = formationService.DeleteInscrption(idUser,idFormation);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("DeleteModule/{idModule}/{idFormation}")
    public ResponseEntity<Void> deleteModule(@PathVariable String idModule,@PathVariable String idFormation) {
        boolean deleted = formationService.deleteModule(idModule,idFormation);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("DeleteSubModule/{idModule}/{idSub}")
    public ResponseEntity<?> deleteSub(@PathVariable String idModule,@PathVariable String idSub) {
        Submodule deleted = formationService.deleteSubmodule(idModule,idSub);
        if (deleted != null) {
            return  ResponseEntity.status(HttpStatus.OK).body(deleted);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
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
    @GetMapping("/getFormations/more/{idUser}")
    public ResponseEntity<List<Formation>> getAllFormationsMore(@PathVariable String idUser){
        List<Formation> formations = formationService.getAllFormationsMore(idUser);
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }
    @GetMapping("/getFormationsAdmin/more")
    public ResponseEntity<List<Formation>> getAllFormationsMoreAdmin(){
        List<Formation> formations = formationService.getAllFormationsMoreAdmin();
        return new ResponseEntity<>(formations,HttpStatus.OK);
    }

    @PostMapping ("addModule/{idFormation}")
    public ResponseEntity<?> addMod(@PathVariable String idFormation, @RequestBody MyModule module) {
       // System.out.println("gggggg");
        MyModule module1 = formationService.addModuleToFormation(idFormation, module);
System.out.println(module1);
        if (module1 == null) {
            String message = "Le module n'a pas été ajouté à la formation avec l'ID : " + idFormation;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(module1);
    }

    @GetMapping ("getModules/{idFormation}/{idUser}")
    public List<MyModule> gettt(@PathVariable String idFormation, @PathVariable String idUser) {
        List<FormationModule> modules = formationService.getModulesForFormation(idFormation,idUser);
        List<MyModule> modules2 = new ArrayList<>();
        for (FormationModule module : modules) {
            modules2.add(module.getMyModule());
        }
        System.out.println(modules2);
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

    @GetMapping ("changeState/{idFormation}/{idUser}/{idModule}/{idSub}")
    public  Boolean getttSC(@PathVariable String idFormation, @PathVariable String idUser, @PathVariable String idModule, @PathVariable String idSub) {
        Boolean s = formationService.changeStateM(idFormation,idUser,idModule ,idSub);

        return s;
    }
    @PostMapping("addSubmodule/{idFormation}/{idModule}")
    public ResponseEntity<?> addSub(@RequestBody Submodule submodule,@PathVariable String idModule,@PathVariable String idFormation){
        Submodule submodule1 = formationService.addSubtitleToModule(idFormation,idModule,  submodule);
        if (submodule1 == null) {
            String message = "Le subModule n'a pas été ajouté à la formation avec l'ID : " + idModule;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(submodule1);
    }
    @GetMapping ("getSubmodules/{idModule}")
    public List<Submodule> gett(@PathVariable String idModule) {
        List<Submodule> submodules = formationService.getSubtitlesForModule(idModule);
        return submodules;
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
            return ResponseEntity.ok(inscriptionFormation);
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
    @PostMapping("addNote/{idUser}/{idFormation}")
    public ResponseEntity<?> addNote(@RequestBody Note note,@PathVariable String idUser,@PathVariable String idFormation){
        System.out.println(note);
        Note note1 = formationService.addNote(idUser,idFormation,note);
        System.out.println(note1);
        if (note1 == null) {
            String message = "note n'a pas été ajouté " ;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping ("getNotes/{idFormation}/{idUser}")
    public  String getNote(@PathVariable String idFormation, @PathVariable String idUser) {
        String s = formationService.getNotes(idUser,idFormation);
        System.out.println(s);
        return s;
    }











    @PostMapping(value = "/Quiz/{ModuleId}")
    public ResponseEntity<?> createQuiz(@RequestBody Quiz quiz,@PathVariable String ModuleId) {
        Quiz createdQuiz = formationService.createQuiz(quiz,ModuleId);
        if(createdQuiz==null){
            String message = "erreur de quiz";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", message));
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(createdQuiz);
        }
    }

    @PostMapping("/Quiz/Question/{IdQuiz}")
    public ResponseEntity<?> createQuestionWithOptions(@RequestBody Question request, @PathVariable String IdQuiz) {
        try {
            Question question = formationService.createQuestion(
                    request.getQuestionText(),
                    request.getOptions().stream().map(Option::getText).collect(Collectors.toList()),
                    IdQuiz

            );
            return ResponseEntity.ok(question);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body("Error: " + ex.getMessage());
        }
    }
    @PostMapping("/TestFinal/Question/{IdTest}")
    public ResponseEntity<?> createQuestionWithOptions2(@RequestBody Question request, @PathVariable String IdTest) {
        try {
            Question question = formationService.createQuestionTest(
                    request.getQuestionText(),
                    request.getOptions().stream().map(Option::getText).collect(Collectors.toList()),
                    IdTest

            );
            return ResponseEntity.ok(question);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body("Error: " + ex.getMessage());
        }
    }


    @PostMapping("/score/{quizId}")
    public ResponseEntity<?> calculateQuizScore(@PathVariable String quizId, @RequestBody List<Integer> answers) {
        try {
            int score = formationService.calculateScore(quizId, answers);
            return ResponseEntity.ok().body(score);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/addTest/{FormationId}")
    public ResponseEntity<TestFinal> addTestFinal(@RequestBody TestFinal testFinal,@PathVariable String FormationId) {
        TestFinal createdTestFinal = formationService.addTestFinal(testFinal,FormationId);
        return new ResponseEntity<>(createdTestFinal, HttpStatus.CREATED);
    }

    @PutMapping("/updateTest/{testId}")
    public ResponseEntity<TestFinal> updateTestFinal(@RequestBody TestFinal testFinal, @PathVariable String testId) {
        TestFinal updatedTestFinal = formationService.updateTestFinal(testFinal, testId);
        if (updatedTestFinal != null) {
            return new ResponseEntity<>(updatedTestFinal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/getTest/{idFormation}")
    public TestFinal getTestFinal(@PathVariable String idFormation) {
        return formationService.getTestFinal(idFormation);
    }
    @GetMapping("/getTestByName/{NameFormation}")
    public Boolean getTestFinalNAME(@PathVariable String NameFormation) {
        TestFinal name = testFinalRepository.findByTitle(NameFormation);
        if(name == null){
            return false;
        }
        else{
            return true;
        }

    }
    @PostMapping("/setEndFormation/{idFormation}/{idUser}/{score}")
    public void setEndFormation(@PathVariable String idFormation,@PathVariable String idUser,@PathVariable Integer score) {
         formationService.setEndFormation(idFormation,idUser,score);
    }
}