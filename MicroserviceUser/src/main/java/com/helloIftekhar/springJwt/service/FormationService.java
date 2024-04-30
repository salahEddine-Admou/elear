package com.helloIftekhar.springJwt.service;


import com.helloIftekhar.springJwt.model.*;
import com.helloIftekhar.springJwt.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
    private SubtitleRep subtitleRep;
    @Autowired
    private InscriptionFormationRepository inscriptionFormationRepository;
    @Autowired
    private FormationModuleRep formationModuleRep;


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

        Optional<User> userOptional = userRepo.findById(userId);

        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(userOptional.get().getId(),"current");
        for (InscriptionFormation inscription : inscriptionFormations) {
            int tailleInscriptionsAll = formationModuleRep.findAllByUser(userOptional.get().getId()).size();
            List<FormationModule> allf = formationModuleRep.findAllByUser(userOptional.get().getId());
            int nombreModulesActifs = 0;
           for (FormationModule formationModule : allf) {
                //Vérifier si le module a l'état "true"
             if (formationModule.getState().equals("true")) {
                    // Incrémenter le compteur si l'état est "true"
                    nombreModulesActifs++;
                }
            }

            int progress = 0;
           if (tailleInscriptionsAll != 0) {
               double ratio = ((double) nombreModulesActifs / tailleInscriptionsAll) * 100.0;

               progress = (int) Math.round(ratio);
            }
           System.out.println(nombreModulesActifs);

            inscription.setProgress(progress);
            inscriptionFormationRepository.save(inscription);
        }


        return inscriptionFormations;

    }

    public List<InscriptionFormation> getAllFormationsFinish(String id) {
        Optional<User> userOptional = userRepo.findById(id);

        List<InscriptionFormation> inscriptionFormations = inscriptionFormationRepository.findByUserAndState(userOptional.get().getId(),"finish");
        for (InscriptionFormation inscription : inscriptionFormations) {
            int tailleInscriptionsAll = formationModuleRep.findAllByUser(userOptional.get().getId()).size();
            List<FormationModule> allf = formationModuleRep.findAllByUser(userOptional.get().getId());
            int nombreModulesActifs = 0;
            for (FormationModule formationModule : allf) {
                //Vérifier si le module a l'état "true"
                if (formationModule.getState().equals("true")) {
                    // Incrémenter le compteur si l'état est "true"
                    nombreModulesActifs++;
                }
            }

            int progress = 0;
            if (tailleInscriptionsAll != 0) {
                double ratio = ((double) nombreModulesActifs / tailleInscriptionsAll) * 100.0;

                progress = (int) Math.round(ratio);
            }
            System.out.println(nombreModulesActifs);

            inscription.setProgress(progress);
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



    public MyModule addModuleToFormation(String id, MyModule module) {
        Formation formation = formationRepository.findById(id).orElse(null);

        if (formation == null) {
            return null;
        }
        List<MyModule> modules = formation.getModules();
        if (modules != null) {
            for (MyModule existingModule : modules) {
                if (existingModule.getTitle().equals(module.getTitle())) {
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
        formationRepository.save(formation);



        return module;
    }

    public Subtitle addSubtitleToModule(String idModule, Subtitle subtitle) {
        MyModule module = moduleRep.findById(idModule)
                .orElse(null);
        if (module == null) {
            return null;
        }
        List<Subtitle> subtitles = module.getSubtitles();
        if (subtitles != null) {
            for (Subtitle existingSub : subtitles) {
                if (existingSub.getTitle().equals(subtitle.getTitle())) {
                    return null;
                }
            }
        } else {
            subtitles = new ArrayList<>();
        }
        subtitles.add(subtitle);
        module.setSubtitles(subtitles);
        subtitleRep.save(subtitle);
        moduleRep.save(module);
        return subtitle;
    }


    public List<MyModule> getModulesForFormation(String formationId) {
        Optional<Formation> formationOptional = formationRepository.findById(formationId);
        if (formationOptional.isPresent()) {
            Formation formation = formationOptional.get();
            List<MyModule> modules = formation.getModules();
            return modules;
        } else {
            throw new RuntimeException("Formation not found");
        }
    }
    public List<Subtitle> getSubtitlesForModule(String moduleId) {
        Optional<MyModule> moduleOptional = moduleRep.findById(moduleId);
        if (moduleOptional.isPresent()) {
            MyModule myModule = moduleOptional.get();
            List<Subtitle> subtitles = myModule.getSubtitles();
            return subtitles;
        } else {
            throw new RuntimeException("Module not found");
        }
    }


    public InscriptionFormation InscriptionFormation(String userId, String formationName) {
        Optional<User> optionalUser = userRepo.findById(userId);
        Optional<Formation> optionalFormation = Optional.ofNullable(formationRepository.findByTitle(formationName));

        if (optionalUser.isPresent() && optionalFormation.isPresent()) {
            User user = optionalUser.get();
            Formation formation = optionalFormation.get();
            InscriptionFormation existingInscription = inscriptionFormationRepository.findByUserFormation(user.getId(), formation.getId());
            if (existingInscription != null) {
                return null;
            }
            InscriptionFormation inscription = new InscriptionFormation();
            inscription.setUser(user);
            inscription.setFormation(formation);
            inscription.setState("current");
            inscription.setProgress(0);
            List<MyModule> modules = formation.getModules();
            if (modules != null) {
                for (MyModule module : modules) {
                    FormationModule formationModule = new FormationModule();
                    formationModule.setUser(optionalUser.get());
                    formationModule.setFormation(formation);
                    formationModule.setMyModule(module);
                    formationModule.setState("false");
                    formationModuleRep.save(formationModule);
                }
            }
            inscriptionFormationRepository.save(inscription);

            return inscription;
        } else {
            return null;
        }
    }




}
