package com.helloIftekhar.springJwt.service;


import com.helloIftekhar.springJwt.model.*;
import com.helloIftekhar.springJwt.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

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


    public Formation CreateFormation(Formation formation) {
        Formation existingFormation = formationRepository.findByTitle(formation.getTitle());

        if (existingFormation != null) {
            return null;
        }
        return formationRepository.save(formation);
    }

    public List<Formation> getAllFormations(){

        return formationRepository.findAll();
    }
    public List<InscriptionFormation> getAllFormationsCurrent(String userId) {
        getAllFormationsFinish(userId);
        Optional<User> userOptional = userRepo.findById(userId);
        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(userOptional.get().getId(),"current");
        for (InscriptionFormation inscription : inscriptionFormations) {

            int tailleInscriptionsAll = formationModuleRep.findAllByUser(userOptional.get().getId(),inscription.getFormation().getId()).size();
            List<FormationModule> allf = formationModuleRep.findAllByUser(userOptional.get().getId(),inscription.getFormation().getId());
            int nombreModulesActifs = 0;
            System.out.println(allf);
           for (FormationModule formationModule : allf) {
               System.out.println("state"+formationModule.getState());
             if (formationModule.getState().equals("true")) {
                    nombreModulesActifs++;
                }
            }
            int progress = 0;
           if (tailleInscriptionsAll != 0) {

               double ratio = ((double) nombreModulesActifs / tailleInscriptionsAll) * 100.0;

               progress = (int) Math.round(ratio);
               System.out.println("progress"+progress);
            }
            inscription.setProgress(progress);
            if(progress==100){
                inscription.setState("finish");
            }

            inscriptionFormationRepository.save(inscription);
        }
        return inscriptionFormations;
    }

    public List<InscriptionFormation> getAllFormationsFinish(String id) {
        Optional<User> userOptional = userRepo.findById(id);
        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(userOptional.get().getId(),"finish");
        for (InscriptionFormation inscription : inscriptionFormations) {
            int tailleInscriptionsAll = formationModuleRep.findAllByUser(userOptional.get().getId(),inscription.getFormation().getId()).size();
            List<FormationModule> allf = formationModuleRep.findAllByUser(userOptional.get().getId(),inscription.getFormation().getId());
            int nombreModulesActifs = 0;
            for (FormationModule formationModule : allf) {
                if (formationModule.getState().equals("true")) {
                    nombreModulesActifs++;
                }
            }

            int progress = 0;
            if (tailleInscriptionsAll != 0) {
                double ratio = ((double) nombreModulesActifs / tailleInscriptionsAll) * 100.0;

                progress = (int) Math.round(ratio);
            }

            inscription.setProgress(progress);
            if(progress!=100){
                inscription.setState("current");
            }
            inscriptionFormationRepository.save(inscription);
        }
        return inscriptionFormations;
    }

    public List<Formation> getAllFormationsMore() {
        List<Formation> formations = formationRepository.findAll();

        if (formations != null) {
            return formations;
        } else {
            return Collections.emptyList();
        }
    }
    public Formation getFormationById(String id){

        return formationRepository.findById(id).orElse(null);
    }
    public boolean deleteFormation(String id){
        formationRepository.deleteById(id);
        return false;
    }


    public Formation updateFormation(String formationId, Formation updatedFormation) {
        Optional<Formation> optionalExistingFormation = formationRepository.findById(formationId);

        if (optionalExistingFormation.isPresent()) {
            Formation existingFormation = optionalExistingFormation.get();
            existingFormation.setTitle(updatedFormation.getTitle());
            existingFormation.setDomaine(updatedFormation.getDomaine());
            existingFormation.setDescription(updatedFormation.getDescription());
            existingFormation.setPhoto(updatedFormation.getPhoto());
            existingFormation.setLangue(updatedFormation.getLangue());
            existingFormation.setLocalisation(updatedFormation.getLocalisation());
            existingFormation.setModules(updatedFormation.getModules());
            return formationRepository.save(existingFormation);
        } else {
            return null;
        }
    }

    public Boolean getStateM(String idFormation, String idUser, String idModule, String idSub) {
        FormationModule module = formationModuleRep.getState(idFormation, idUser, idModule);
        if (module != null && module.getModuleSubModules() != null) {
            for (ModuleSubModule f : module.getModuleSubModules()) {
                if (f.getSubmodule().getId().equals(idSub)) {

                    if(f.getStateM().equals("true")){
                        return true;
                    }
                    if(f.getStateM().equals("false")){
                        return false;
                    }
                }
            }
        }
        return false;
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
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public MyModule addModuleToFormation(String id, MyModule module) {
        Formation formation = formationRepository.findById(id).orElse(null);

        if (formation == null) {
            return null;
        }
        List<MyModule> modules = formation.getModules();
        if (modules != null) {
            for (MyModule existingModule : modules) {
                if (existingModule.getName().equals(module.getName())) {
                    return null;
                }
            }
        } else {
            modules = new ArrayList<>();
        }
        module.setStateM(false);
        modules.add(module);
        formation.setModules(modules);
        moduleRep.save(module);
        List<FormationModule> users = formationModuleRep.findByFormation(formation.getId());
        Set<String> uniqueUsers = new HashSet<>();
        for (FormationModule user : users) {
            uniqueUsers.add(user.getUser().getId());
        }
        List<String> uniqueUsersList = new ArrayList<>(uniqueUsers);
        for (String user : uniqueUsersList) {
            Optional<User> user1 = userRepo.findById(user);
            MyModule m = moduleRep.findByName(module.getName());
            FormationModule formationModule = new FormationModule();
            formationModule.setMyModule(m);
            formationModule.setUser(user1.get());
            formationModule.setFormation(formation);
            formationModule.setState("false");
            formationModuleRep.save(formationModule);
        }
        formationRepository.save(formation);
        return module;
    }

    public Submodule addSubtitleToModule(String idFormation, String idModule, Submodule submodule) {
        Formation formation = formationRepository.findById(idFormation).orElse(null);
        MyModule module = moduleRep.findById(idModule)
                .orElse(null);
        if (module == null) {
            return null;
        }
        List<Submodule> submodules = module.getSubmodules();
        if (submodules != null) {
            for (Submodule existingSub : submodules) {
                if (existingSub.getTitle().equals(submodule.getTitle())) {
                    return null;
                }
            }
        } else {
            submodules = new ArrayList<>();
        }
        submodules.add(submodule);
        module.setSubmodules(submodules);
        subtitleRep.save(submodule);
        List<FormationModule> users = formationModuleRep.findByFormationModule(formation.getId(),module.getId());
System.out.println(users);
        if(users != null && !users.isEmpty()) {
            Submodule s = subtitleRep.findByName(submodule.getTitle());
            ModuleSubModule moduleSub = new ModuleSubModule();
            moduleSub.setSubmodule(s);
            moduleSub.setStateM("false");
            moduleSubRep.save(moduleSub);
            for (FormationModule ff : users) {
                ff.setState("false");
                ff.getModuleSubModules().add(moduleSub);
                formationModuleRep.save(ff);
            }
        }
        moduleRep.save(module);
        return submodule;
    }


    public List<FormationModule> getModulesForFormation(String formationId, String idUser) {

        Optional<Formation> formationOptional = formationRepository.findById(formationId);
        Optional<User> user = userRepo.findById(idUser);
        if (formationOptional.isPresent() && user.isPresent()) {
            Formation formation = formationOptional.get();
            List<FormationModule> formationModules = formationModuleRep.findAllByUser(user.get().getId(),formation.getId());
            String g = "true";
            for (FormationModule formationModule : formationModules) {
             for(ModuleSubModule m : formationModule.getModuleSubModules()){
                 if(m.getStateM().equals("false")){
                     g = "false";
                 }
             }
                if(g.equals("true")){
                    formationModule.setState("true");
                    formationModuleRep.save(formationModule);
                }
                if(g.equals("false")){
                    formationModule.setState("false");
                    formationModuleRep.save(formationModule);
                }
            }
            return formationModules;
        } else {
            throw new RuntimeException("Formation not found");
        }
    }
    public List<Submodule> getSubtitlesForModule(String moduleId) {
        Optional<MyModule> moduleOptional = moduleRep.findById(moduleId);
        if (moduleOptional.isPresent()) {
            MyModule myModule = moduleOptional.get();
            List<Submodule> submodules = myModule.getSubmodules();
            return submodules;
        } else {
            throw new RuntimeException("Submodule not found");
        }
    }
    public InscriptionFormation enrollUserToFormation(Formation formation, User user) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // Extraire l'ID de l'utilisateur à partir des détails de l'utilisateur
        String userUsername = userDetails.getUsername(); // Supposant que l'ID de l'utilisateur est stocké dans le nom d'utilisateur
        // Vérifier si l'ID de l'utilisateur correspond à celui fourni dans la méthode
        if (!userUsername.equals(user.getUsername())) {
            throw new IllegalArgumentException("L'utilisateur actuellement authentifié ne correspond pas à l'utilisateur fourni.");
        }
if(inscriptionFormationRepository.findByUserFormation(user.getId(),formation.getId())==null) {
    InscriptionFormation inscription = new InscriptionFormation();
    inscription.setUser(user);
    inscription.setFormation(formation);
    inscription.setState("current");
    inscription.setProgress(0);
    List<MyModule> modules = formation.getModules();

    if (modules != null ) {
        for (MyModule module : modules) {
            if (!module.getSubmodules().isEmpty()) {
                for (Submodule submodule : module.getSubmodules()) {
                    ModuleSubModule moduleSub = new ModuleSubModule();
                    moduleSub.setSubmodule(submodule);
                    moduleSub.setStateM("false");
                    moduleSubRep.save(moduleSub);
                    FormationModule formationModule = new FormationModule();
                    formationModule.setUser(user);
                    formationModule.setFormation(formation);
                    formationModule.setMyModule(module);
                    if (formationModule.getModuleSubModules() == null) {
                        formationModule.setModuleSubModules(new ArrayList<>());
                        formationModule.getModuleSubModules().add(moduleSub);
                    }
                    else{
                    formationModule.getModuleSubModules().add(moduleSub);}
                    formationModule.setState("false");
                    formationModuleRep.save(formationModule);
                }
            }
            else{
                FormationModule formationModule = new FormationModule();
                formationModule.setUser(user);
                formationModule.setFormation(formation);
                formationModule.setMyModule(module);
                formationModule.setState("false");
                formationModuleRep.save(formationModule);
            }

        }
    }
    inscriptionFormationRepository.save(inscription);
    return inscription;
}
else{
    return null;
}

    }
    public Formation getFormationByName(String NameF) {
        return formationRepository.findByTitle(NameF);
    }
}
