package com.helloIftekhar.springJwt.service;

import com.helloIftekhar.springJwt.DTO.ProgressDTO;
import com.helloIftekhar.springJwt.model.*;
import com.helloIftekhar.springJwt.repository.*;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormationService {
    @Autowired
    private Formationrepository formationRepository;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ModuleRep moduleRep;
    @Autowired
    private SubmoduleRep subtitleRep;
    @Autowired
    private InscriptionFormationRepository inscriptionFormationRepository;
    @Autowired
    private FormationModuleRep formationModuleRep;
    @Autowired
    private ModuleSubRep moduleSubRep;
    @Autowired
    private CertificatRepo certificatRepo;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private QuizRepository quizRepository ;
    @Autowired
    private QuestionRepository questionRepository ;
    @Autowired
    private OptionRepository optionRepository ;

    //// formations
    public Formation CreateFormation(Formation formation) {
        Formation existingFormation = formationRepository.findByTitle(formation.getTitle());

        if (existingFormation != null) {
            return null;
        }
        return formationRepository.save(formation);
    }
    public Formation getFormationById(String id){

        return formationRepository.findById(id).orElse(null);
    }
    @Transactional
    public boolean deleteFormation(String id) {
        // Supprimer toutes les inscriptions associées en un seul appel
        inscriptionFormationRepository.deleteByFormationId(id);

        // Supprimer la formation
        formationRepository.deleteById(id);

        return true;
    }
    public Formation updateFormation(String formationId, Formation updatedFormation) {
        Optional<Formation> optionalExistingFormation = formationRepository.findById(formationId);

        if (optionalExistingFormation.isPresent()) {
            Formation existingFormation = optionalExistingFormation.get();
            existingFormation.setTitle(updatedFormation.getTitle());
            existingFormation.setDomaine(updatedFormation.getDomaine());
            existingFormation.setDescription(updatedFormation.getDescription());
            existingFormation.setPhoto(updatedFormation.getPhoto());
            existingFormation.setDate(updatedFormation.getDate());
            existingFormation.setLocalisation(updatedFormation.getLocalisation());
            existingFormation.setModules(updatedFormation.getModules());
            return formationRepository.save(existingFormation);
        } else {
            return null;
        }
    }

    public List<InscriptionFormation> getAllFormationsCurrent(String userId) {
        getAllFormationsFinish(userId);
        Optional<User> userOptional = userRepo.findById(userId);
        if (!userOptional.isPresent()) {
            return Collections.emptyList();
        }
        User user = userOptional.get();
        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(user.getId(), "current");
        return inscriptionFormations;
    }
    public List<InscriptionFormation> getAllFormationsFinish(String id) {
        Optional<User> userOptional = userRepo.findById(id);
        if (!userOptional.isPresent()) {
            return new ArrayList<>();
        }

        User user = userOptional.get();
        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(user.getId(), "finish");

        return inscriptionFormations;
    }

    public List<Formation> getAllFormationsMoreAdmin() {
        List<Formation> formations = formationRepository.findAll();

        if (formations != null) {
            return formations;
        } else {
            return Collections.emptyList();
        }
    }

    public List<Formation> getAllFormationsMore(String userId) {
        // Get all available formations with complete modules and submodules
        List<Formation> allFormations = getAllFormationsWithModulesAndSubmodules();

        // Get current formations for the user
        List<Formation> currentFormations = getAllFormationsCurrent(userId).stream()
                .map(InscriptionFormation::getFormation)
                .collect(Collectors.toList());

        // Get finished formations for the user
        List<Formation> finishedFormations = getAllFormationsFinish(userId).stream()
                .map(InscriptionFormation::getFormation)
                .collect(Collectors.toList());

        // Combine the lists of current and finished formations to filter them out
        Set<Formation> excludedFormations = new HashSet<>();
        excludedFormations.addAll(currentFormations);
        excludedFormations.addAll(finishedFormations);

        // Filter out formations that the user is currently registered for or has finished
        return allFormations.stream()
                .filter(formation -> !excludedFormations.contains(formation))
                .collect(Collectors.toList());
    }

    private List<Formation> getAllFormationsWithModulesAndSubmodules() {
        List<Formation> formations = formationRepository.findAll();
        return formations.stream()
                .filter(formation -> formation.getModules() != null && !formation.getModules().isEmpty())
                .filter(formation -> formation.getModules().stream()
                        .allMatch(module ->
                                module.getSubmodules() != null && !module.getSubmodules().isEmpty() &&
                                        module.getSubmodules().stream()
                                                .allMatch(submodule -> submodule.getContenu() != null && !submodule.getContenu().isEmpty())
                        )
                )
                .collect(Collectors.toList());
    }




    /////// Modules

    @Transactional
    public MyModule addModuleToFormation(String formationId, MyModule module) {
        Formation formation = formationRepository.findById(formationId).orElse(null);
        if (formation == null) {
            return null;
        }
        if (formation.getModules() != null && formation.getModules().stream().anyMatch(m -> m.getName().equals(module.getName()))) {
            return null;
        }
        if (formation.getModules() == null) {
            formation.setModules(new ArrayList<>());
        }
        final MyModule savedModule = moduleRep.save(module);
        formation.getModules().add(savedModule);
        formationRepository.save(formation);
        List<FormationModule> formationModules = formationModuleRep.findByFormation(formationId);
        Set<String> uniqueUserIds = formationModules.stream()
                .map(fm -> fm.getUser().getId())
                .collect(Collectors.toSet());

        uniqueUserIds.forEach(userId -> updateUserFormationModule(userId, formation, savedModule));

        return savedModule;
    }
    private void updateUserFormationModule(String userId, Formation formation, MyModule module) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            FormationModule formationModule = new FormationModule();
            formationModule.setUser(userOptional.get());
            formationModule.setFormation(formation);
            formationModule.setMyModule(module);
            formationModule.setState("false");
            formationModuleRep.save(formationModule);
        }
    }
    public MyModule updateModule(String moduleId, MyModule updatedModule) {
        MyModule ModuleName = moduleRep.findByName(updatedModule.getName());
        if(ModuleName == null) {
            Optional<MyModule> optionalExistingModule = moduleRep.findById(moduleId);
            System.out.println(optionalExistingModule.get().getName());
            System.out.println(updatedModule.getName());
            if (optionalExistingModule.isPresent()) {
                MyModule existingModule = optionalExistingModule.get();
                if (!updatedModule.getName().isEmpty()) {
                    existingModule.setName(updatedModule.getName());
                }
                if (updatedModule.getSubmodules() != null) {
                    existingModule.setSubmodules(updatedModule.getSubmodules());
                }

                return moduleRep.save(existingModule);

            } else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    @Transactional
    public boolean deleteModule(String idModule, String idFormation) {
        // Fetch the formation to ensure it exists and to get module references
        Optional<Formation> optionalFormation = formationRepository.findById(idFormation);
        if (!optionalFormation.isPresent()) {
            return false; // Formation not found, return false
        }

        // Delete the module and all related FormationModules
        moduleRep.deleteById(idModule);
        formationModuleRep.deleteByFormationAndModule(idFormation, idModule);

        // Remove the module from the formation's module list
        Formation formation = optionalFormation.get();
        formation.getModules().removeIf(module -> module.getId().equals(idModule));
        formationRepository.save(formation);

        return true;
    }



















    public Submodule deleteSubmodule(String idModule,String idSubmodule){
        Optional<Submodule> h = subtitleRep.findById(idSubmodule);
        subtitleRep.deleteById(idSubmodule);
        List<ModuleSubModule> list =  moduleSubRep.findBySub(idSubmodule);
        for(ModuleSubModule i : list){
            moduleSubRep.deleteById(i.getId());
        }
        Optional<MyModule> f = moduleRep.findById(idModule);
        f.get().getSubmodules().remove(idSubmodule);
        moduleRep.save(f.get());
        return h.get();
    }

    public Boolean getStateM(String idFormation, String idUser, String idModule, String idSub) {
        FormationModule module = formationModuleRep.getState(idFormation, idUser, idModule);
        if (module == null || module.getModuleSubModules() == null) {
            throw new IllegalStateException("Module or submodules not found for the given IDs");
        }

        return module.getModuleSubModules().stream()
                .filter(f -> f.getSubmodule().getId().equals(idSub))
                .map(f -> f.getStateM().equals("true"))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Submodule not found"));
    }

    public Boolean changeStateM(String idFormation, String idUser,String idModule, String idSub) {
        FormationModule module = formationModuleRep.getState(idFormation, idUser, idModule);
        if (module != null && module.getModuleSubModules() != null) {
            for (ModuleSubModule f : module.getModuleSubModules()) {
                if (f.getSubmodule().getId().equals(idSub)) {
                    if(f.getStateM().equals("false")){
                        f.setStateM("true");
                        moduleSubRep.save(f);
                        getModulesForFormation(idFormation,idUser);
                        getAllFormationsCurrent(idUser);
                        Optional<User> userOptional = userRepo.findById(idUser);
                        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(userOptional.get().getId(), "current");

                        for (InscriptionFormation inscription : inscriptionFormations) {
                            //ProgressDTO progress = formationModuleRep.getFormationProgress(userOptional.get().getId(), inscription.getFormation().getId());
                            List<FormationModule> modules = formationModuleRep.gett(userOptional.get().getId(), inscription.getFormation().getId());

// Count the number of FormationModules
                            long countSubmodules = modules.stream()
                                    .mapToLong(modulee -> modulee.getModuleSubModules().size()) // Map each FormationModule to its number of ModuleSubmodules
                                    .sum();

// Count the number of ModuleSubmodules with state true using streams
                            long countSubmodulesTrue = modules.stream()
                                    .flatMap(mmodule -> mmodule.getModuleSubModules().stream()) // Flatten all submodules into a single stream
                                    .filter(submodule -> "true".equals(submodule.getStateM())) // Filter to include only those submodules where stateM is "true"
                                    .count(); // Count them

                            System.out.println("Total number of FormationModules: " + countSubmodules);
                            System.out.println("Total number of ModuleSubmodules with state true: " + countSubmodulesTrue);

                                int progressPercentage = (int) Math.round((double) countSubmodulesTrue / countSubmodules * 100);
                                inscription.setProgress(progressPercentage);
                                Certificat c = certificatRepo.findByUserFormation(idUser,inscription.getFormation().getId());
                                // System.out.println("helooooooooooooo"+c);
                                c.setProgress(progressPercentage);

                                if (progressPercentage == 100) {
                                    inscription.setState("finish");
                                    c.setStateCert("finish");
                                    //certificatRepo.save(c);
                                }
                            certificatRepo.save(c);
                            // certificatRepo.save(c);
                            inscriptionFormationRepository.save(inscription);
                        }

                        System.out.printf("helllllllllllllllllllllllllllllllllllllllllllll");

                        return true;
                    }
                }
            }
        }
        return false;
    }

    public List<FormationModule> getModulesForFormation(String formationId, String idUser) {
        Optional<Formation> formationOptional = formationRepository.findById(formationId);
        Optional<User> userOptional = userRepo.findById(idUser);

        if (!formationOptional.isPresent() || !userOptional.isPresent()) {
            throw new RuntimeException("Formation or User not found");
        }

        User user = userOptional.get();
        Formation formation = formationOptional.get();
        List<FormationModule> formationModules = formationModuleRep.findAllByUser(user.getId(), formation.getId());

        formationModules.forEach(formationModule -> {
            boolean allModulesComplete = formationModule.getModuleSubModules().stream()
                    .allMatch(m -> m.getStateM().equals("true"));

            String newState = allModulesComplete ? "true" : "false";
            if (!newState.equals(formationModule.getState())) {
                formationModule.setState(newState);
                formationModuleRep.save(formationModule);
            }
        });

        return formationModules;
    }
    public List<MyModule> getModulesForFormationAdmin(String formationId) {
        return formationRepository.findById(formationId)
                .map(Formation::getModules)
                .orElseThrow(() -> new FormationNotFoundException("Formation not found with ID: " + formationId));
    }





    /////// submodule
    public List<Submodule> getSubtitlesForModule(String moduleId) {
        return moduleRep.findById(moduleId)
                .map(MyModule::getSubmodules)
                .orElseThrow(() -> new RuntimeException("Module not found for ID: " + moduleId));
    }
    public Submodule addSubtitleToModule(String idFormation, String idModule, Submodule submodule) {
        Formation formation = formationRepository.findById(idFormation)
                .orElseThrow(() -> new RuntimeException("Formation not found for ID: " + idFormation));
        MyModule module = moduleRep.findById(idModule)
                .orElseThrow(() -> new RuntimeException("Module not found for ID: " + idModule));

        List<Submodule> submodules = Optional.ofNullable(module.getSubmodules()).orElseGet(ArrayList::new);

        if (submodules.stream().anyMatch(s -> s.getTitle().equals(submodule.getTitle()))) {
            return null; // Submodule already exists, so return null or consider throwing an exception
        }

        submodules.add(submodule);
        module.setSubmodules(submodules);
        Submodule hh = subtitleRep.save(submodule);

        List<FormationModule> users = formationModuleRep.findByFormationModule(formation.getId(), module.getId());
        System.out.println(users);

        if (!users.isEmpty()) {
            Submodule s = subtitleRep.findByName(submodule.getTitle());
            ModuleSubModule moduleSub = new ModuleSubModule();
            moduleSub.setSubmodule(s);
            moduleSub.setStateM("false");
            moduleSubRep.save(moduleSub);

            users.forEach(ff -> {
                ff.setState("false");
                ff.getModuleSubModules().add(moduleSub);
                formationModuleRep.save(ff);
            });
        }

        moduleRep.save(module);
        return hh;
    }


    public Submodule updateSub(String subId, Submodule updatedSubmodule) {
        Submodule Sub = subtitleRep.findByName(updatedSubmodule.getTitle());
        Optional<Submodule> optionalExistingSub = subtitleRep.findById(subId);
        if(Sub == null || updatedSubmodule.getTitle().equals(optionalExistingSub.get().getTitle())) {


            if (optionalExistingSub.isPresent()) {
                Submodule existingSub = optionalExistingSub.get();

                if (!updatedSubmodule.getTitle().isEmpty()) {
                    existingSub.setTitle(updatedSubmodule.getTitle());
                }
                if (updatedSubmodule.getContenu() != null && !updatedSubmodule.getContenu().isEmpty()) {
                    existingSub.setContenu(updatedSubmodule.getContenu());
                } else {
                    existingSub.setContenu(""); // Assuming you want to set empty string if null or empty input is found
                }

                return subtitleRep.save(existingSub);
            } else {
                return null;
            }
        }else{
            return null;
        }
    }

    public InscriptionFormation enrollUserToFormation(Formation formation, User user) {
        validateUserAuthentication(user);

        if (inscriptionFormationRepository.findByUserFormation(user.getId(), formation.getId()) != null) {
            return null; // User is already enrolled.
        }

        InscriptionFormation inscription = new InscriptionFormation();
        inscription.setUser(user);
        inscription.setFormation(formation);
        inscription.setState("current");
        inscription.setProgress(0);

        formation.getModules().forEach(module -> initializeFormationModules(user, formation, module));
        addCertificat(user.getId(), formation.getId(), 0);
        inscriptionFormationRepository.save(inscription);
        return inscription;
    }

    private void initializeFormationModules(User user, Formation formation, MyModule module) {
        List<Submodule> submodules = Optional.ofNullable(module.getSubmodules()).orElse(new ArrayList<>());
        if (!submodules.isEmpty()) {
            FormationModule f = createAndSaveFormationModule0(user, formation, module);
            submodules.forEach(submodule -> processSubmodule(f,submodule));
        } else {
            createAndSaveFormationModule0(user, formation, module);
        }
    }

    private void processSubmodule(FormationModule f,Submodule submodule) {
        ModuleSubModule moduleSub = new ModuleSubModule();
        moduleSub.setSubmodule(submodule);
        moduleSub.setStateM("false");
        moduleSubRep.save(moduleSub);

        createAndSaveFormationModule(f ,moduleSub);
    }

    private void createAndSaveFormationModule(FormationModule f, ModuleSubModule moduleSub) {

        if (moduleSub != null) {
            if (f.getModuleSubModules() == null) {
                f.setModuleSubModules(new ArrayList<>());
                formationModuleRep.save(f);
            }
            f.getModuleSubModules().add(moduleSub);
        }
        formationModuleRep.save(f);
    }
    private FormationModule createAndSaveFormationModule0(User user, Formation formation, MyModule module) {
        FormationModule formationModule = new FormationModule();
        formationModule.setUser(user);
        formationModule.setFormation(formation);
        formationModule.setMyModule(module);
        formationModule.setState("false");
        return  formationModuleRep.save(formationModule);
    }

    private void validateUserAuthentication(User user) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!userDetails.getUsername().equals(user.getUsername())) {
            throw new IllegalArgumentException("Authenticated user does not match the provided user.");
        }

    }



////////////// certificats

    public BufferedImage generateCertificateImage(String fullName, String title, String date) {
        int width = 1300;
        int height = 700;

        // Create a buffered image in memory
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = bufferedImage.createGraphics();

        // Enable antialiasing for text
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Draw a white background
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, width, height);

        try {
            BufferedImage logo = ImageIO.read(new File("src/main/java/com/helloIftekhar/springJwt/service/Orange-logo.jpg")); // Ensure this path is correct
            g2d.drawImage(logo, 140, 50, 150, 120, null); // Adjust sizing as necessary
        } catch (IOException e) {
            e.printStackTrace();
        }
        g2d.setColor(Color.green);
        g2d.setFont(new Font("Serif", Font.BOLD, 40));
        g2d.drawString("{", 160, 220);
        // Certificate text styles and positions
        g2d.setColor(Color.ORANGE);
        g2d.setFont(new Font("Serif", Font.BOLD, 40));
        g2d.drawString("Certificate", 190, 220); // Adjust positioning as necessary
        g2d.setFont(new Font("Serif", Font.BOLD, 40));
        g2d.drawString("of attendance", 190, 260);
        g2d.setColor(Color.green);
        g2d.setFont(new Font("Serif", Font.BOLD, 40));
        g2d.drawString("}", 420, 260);
        g2d.setColor(Color.black);
        g2d.setFont(new Font("Serif", Font.PLAIN, 20));
        g2d.drawString("Orange Digital Center certifies", 160, 300);

        g2d.setFont(new Font("Arial", Font.BOLD, 40));
        g2d.drawString(fullName, 160, 350);
        g2d.setFont(new Font("Arial", Font.PLAIN, 20));
        g2d.drawString("has actively participate in ", 160, 390);
        g2d.setFont(new Font("Arial", Font.BOLD, 20));
        g2d.drawString(title, 395, 390);
        g2d.setFont(new Font("Arial", Font.PLAIN, 20));
        g2d.drawString("organised by Orange Digital Center Rabat", 160, 420);
        g2d.setFont(new Font("Arial", Font.BOLD, 20));
        g2d.drawString("in duration"+date, 160, 460);
        g2d.drawString("Mm.Nadia Mrabi", 640, 540);
        g2d.setFont(new Font("Arial", Font.PLAIN, 20));
        g2d.drawString("Senior Manager PSE et Orange Digital Center", 640, 580);

        g2d.dispose();
        return bufferedImage;
    }

    public List<Certificat> getCertificatsFinish(String userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return certificatRepo.findByUserState(userId, "finish");
    }

    public List<Certificat> getCertificatsCurrent(String userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        return certificatRepo.findByUserState(userId, "current");
    }
    public Boolean addCertificat(String userId, String formationId, Integer progress) {
        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Formation formation = formationRepository.findById(formationId).orElseThrow(() -> new IllegalArgumentException("Formation not found"));

        if (certificatRepo.findByUserFormationState(userId, formationId, "current") != null) {
            System.out.println("Certificate already exists for current state.");
            return false;
        }

        try {
            Certificat newCertificat = new Certificat();
            newCertificat.setUser(user);
            newCertificat.setFormation(formation);
            newCertificat.setStateCert("current");
            newCertificat.setProgress(progress);

            BufferedImage certImage = generateCertificateImage(user.getFullName(), formation.getTitle(), formation.getDate());
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(certImage, "png", bos);
            byte[] imageBytes = bos.toByteArray();
            newCertificat.setPdfData(new Binary(imageBytes));
            certificatRepo.save(newCertificat);
            return true;
        } catch (IOException e) {
            System.err.println("Error generating certificate image: " + e.getMessage());
            return false;
        }
    }
















    public Formation getFormationByName(String NameF) {

        return formationRepository.findByTitle(NameF);
    }

    public Note addNote(String idUser,String idFormation, Note note) {
        User user = userRepo.findById(idUser).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Formation formation = formationRepository.findById(idFormation).orElseThrow(() -> new IllegalArgumentException("Formation not found"));
        Note n = noteRepository.findByNotes(idUser, idFormation);
        if(n==null) {
            Note note1 = new Note();
            note1.setUser(user);
            note1.setFormation(formation);
            System.out.println(note.getText());
            note1.setText(note.getText());
            noteRepository.save(note1);
        }else{
            String nn = n.getText() + note.getText();
            n.setText(nn);
            noteRepository.save(n);
        }

        return note;
    }
    public String getNotes(String userId,String formationId) {
        Note n = noteRepository.findByNotes(userId, formationId);
        return n.getText();
    }










    public Quiz createQuiz(Quiz quiz,String ModuleId) {

        Optional<MyModule> module1 = moduleRep.findById(ModuleId);
        System.out.println(module1.isPresent());
        if (module1.isPresent()) {
            Quiz quiz2 = quizRepository.findByTitle(quiz.getTitle());
            System.out.println(quiz2);
            if (quiz2 == null) {
            MyModule existingModule = module1.get();
                Quiz quiz1 = quizRepository.save(quiz);
            existingModule.setQuiz(quiz1);

            moduleRep.save(existingModule);
            return quiz1;}
            else{
                return null;
            }
        } else {
            return null;
        }



    }

    @Transactional
    public Question createQuestion(String text, List<String> optionsTexts, String quizId) {
        // Créer la question
        Question question = new Question();
        question.setQuestionText(text);

        // Créer et sauvegarder chaque option
        List<Option> options = new ArrayList<>();
        for (String optionText : optionsTexts) {
            Option option = new Option();
            option.setText(optionText);
            option = optionRepository.save(option);
            options.add(option);
        }
        question.setOptions(options);
        question = questionRepository.save(question);

        // Associer la question au quiz
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found with id: " + quizId));
        List<Question> questions = quiz.getQuestions();
        if (questions == null) {
            questions = new ArrayList<>();
        }
        questions.add(question);
        quiz.setQuestions(questions);
        quizRepository.save(quiz);

        return question;
    }


    public Quiz getQuiz(String id)  {
        Optional<Quiz> quiz = quizRepository.findById(id);
        if (quiz.isPresent()) {
            return quiz.get();
        } else {
            return null;
        }
    }

    // Mettre à jour un quiz
    public Quiz updateQuiz(String id, Quiz updatedQuiz) {
        Quiz quiz = getQuiz(id);
        quiz.setTitle(updatedQuiz.getTitle());
        quiz.setQuestions(updatedQuiz.getQuestions());
        return quizRepository.save(quiz);
    }

    // Supprimer un quiz
    public void deleteQuiz(String id) {
        quizRepository.deleteById(id);
    }

    // Calculer le score pour un quiz
    public int calculateScore(String quizId, List<Integer> answers)  {
        Quiz quiz = getQuiz(quizId);
        List<Question> questions = quiz.getQuestions();

        if (answers.size() != questions.size()) {
            return -1;
        }

        int score = 0;
        for (int i = 0; i < questions.size(); i++) {
            Question question = questions.get(i);
            if (answers.get(i) == question.getCorrectOption()) {
                score++;
            }
        }

        // Calculate percentage
        double percentage = ((double) score / questions.size()) * 100;
        return (int)percentage;
    }



}
