package com.helloIftekhar.springJwt.service;


import com.helloIftekhar.springJwt.model.Formation;
import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Subtitle;
import com.helloIftekhar.springJwt.model.User;
import com.helloIftekhar.springJwt.repository.Formationrepository;
import com.helloIftekhar.springJwt.repository.UserRepository;
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



    public Formation CreateFormation(Formation formation) {
        formation.setState("not_registred");
        return formationRepository.save(formation);
    }
    public List<Formation> getAllFormations(){

        return formationRepository.findAll();
    }
    public List<Formation> getAllFormationsCurrent(String id) {
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Formation> form = user.getFormations();

            if (form != null) {
                List<Formation> currentFormations = form.stream()
                        .filter(formation -> "current".equals(formation.getState()))
                        .map(formation -> {
                            Integer progress = getProgress(user.getId(), formation.getTitle());
                            formation.setProgress(progress);
                            return formation;
                        })
                        .collect(Collectors.toList());

                return currentFormations;
            } else {
                return Collections.emptyList();
            }
        } else {
            throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }




    public List<Formation> getAllFormationsFinish(String id) {
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Formation> form = user.getFormations();

            if (form != null) {
                List<Formation> finishFormations = form.stream()
                        .filter(formation -> "finish".equals(formation.getState()))
                        .collect(Collectors.toList());

                return finishFormations;
            } else {
                return Collections.emptyList();
            }
        } else {
            throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }

    public Formation AddMod(String id, MyModule module) {
      Formation f =  formationRepository.findById(id)
                .map(st -> {


                    if (st.getModules()== null) {
                        st.setModules(new ArrayList<>()); // Créer une nouvelle liste si elle est null
                    }
                        module.setProgress(0);
                    st.getModules().add(module); // Ajouter la formation à la liste

                    return formationRepository.save(st);
                }).orElseThrow(() -> new UserNotFoundException("Sorry, this formation could not be found"));

        List<User> usersWithUpdatedFormation = userRepo.findAllByFormationName(id);

        // Mettre à jour la formation dans chaque utilisateur
        for (User user : usersWithUpdatedFormation) {
            List<Formation> formations = user.getFormations();
            for (Formation formation : formations) {
                if (formation.getId().equals(id)) {
                    if (formation.getModules()== null) {
                        formation.setModules(new ArrayList<>()); // Créer une nouvelle liste si elle est null
                    }
                    module.setProgress(0);
                    formation.getModules().add(module);
                    // Mettre à jour d'autres champs si nécessaire
                    break;
                }
            }
            user.setFormations(formations);
            userRepo.save(user);
        }

return f;
    }
    public Formation AddSub(String id, String nameModule, Subtitle subtitle) {
       /* Optional<Formation> formationOptional = formationRepository.findById(id);

        if (formationOptional.isPresent()) {
            Formation formation = formationOptional.get();

            // Trouver le module correspondant par son nom
            Optional<MyModule> moduleOptional = formation.getModules().stream()
                    .filter(module -> module.getTitle().equals(nameModule))
                    .findFirst();
            if (moduleOptional.get().getSubtitles()==null) {
                MyModule module = moduleOptional.get();
                module.setSubtitles(new ArrayList<>()); // Créer une nouvelle liste si elle est null
            }
            if (moduleOptional.isPresent()) {
                MyModule module = moduleOptional.get();

                // Ajouter le sous-titre au module
                module.getSubtitles().add(subtitle);

                // Mettre à jour la formation dans la base de données
                formationRepository.save(formation);

                return formation;
            }
        }*/
        List<User> usersWithUpdatedFormation = userRepo.findAllByFormationName(id);
        for (User user : usersWithUpdatedFormation) {
            List<Formation> formations = user.getFormations();
            for (Formation formation : formations) {
                if (formation.getId().equals(id)) {
                    Optional<MyModule> moduleOptional = formation.getModules().stream()
                            .filter(module -> module.getTitle().equals(nameModule))
                            .findFirst();
                    System.out.println(moduleOptional);
                    if (moduleOptional.get().getSubtitles()==null) {
                        MyModule module = moduleOptional.get();
                        module.setSubtitles(new ArrayList<>()); // Créer une nouvelle liste si elle est null
                    }
                    if (moduleOptional.isPresent()) {
                        MyModule module = moduleOptional.get();
System.out.println();
                        module.getSubtitles().add(subtitle);
                        System.out.println(module.getSubtitles());
                        // Mettre à jour la formation dans la base de données
                        formationRepository.save(formation);

                        break;
                    }


                }
            }
            user.setFormations(formations);
            userRepo.save(user);
        }

        return null;
    }


    public Integer getProgress(String id, String nameFormation) {
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            for (Formation formation : user.getFormations()) {
                if (formation.getTitle().equals(nameFormation)) {
                    List<MyModule> modules = formation.getModules();
                    if (modules == null || modules.isEmpty()) {
                        return 0;
                    }
                    int totalModules = modules.size();
                    int completedModules = 0;

                    for (MyModule module : modules) {
                        if (module.getStateM().equals(true)) {
                            completedModules++;
                        }
                    }
                    if (totalModules > 0) {
                        return (int) ((double) completedModules / totalModules * 100);
                    } else {
                        return 0;
                    }
                }
            }
            return -1;
        } else {
            throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }

    public List<Formation> getAllFormationsMore() {
        List<Formation> formations = formationRepository.findAllMore();

        if (formations != null) {
            return formations;
        } else {
            return Collections.emptyList(); // Ou une autre action à prendre si la liste est nulle
        }
    }
    public Formation getFormationById(String id){

        return formationRepository.findById(id).orElse(null);
    }
    public boolean deleteFormation(String id){
        formationRepository.deleteById(id);
        return false;
    }


    public void updateFormation(String formationId, Formation updatedFormation) {
        Formation existingFormation = formationRepository.findById(formationId).orElse(null);

            existingFormation.setTitle(updatedFormation.getTitle());

            existingFormation.setDescription(updatedFormation.getDescription());

            existingFormation.setPhoto(updatedFormation.getPhoto());
            existingFormation.setLangue(updatedFormation.getLangue());
            existingFormation.setLocalisation(updatedFormation.getLocalisation());
       formationRepository.save(existingFormation);
    }









}
