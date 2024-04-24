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

            List<Formation> currentFormations = form.stream()
                    .filter(formation -> "current".equals(formation.getState()))
                    .map(formation -> {
                        // Obtenir la progression de la formation
                        Integer progress = getProgress(user.getId(), formation.getTitle());
                        // Mettre à jour l'attribut de progression de la formation
                        formation.setProgress(progress);
                        return formation;
                    })
                    .collect(Collectors.toList());

            return currentFormations;
        } else {
            // Gérer le cas où l'utilisateur n'est pas trouvé
            throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }

    public List<Formation> getAllFormationsFinish(String id){

        Optional<User> user1 = userRepo.findById(id);
        List<Formation> form =  user1.get().getFormations();
        List<Formation> finishFormations = form.stream()
                .filter(formation -> "finish".equals(formation.getState()))
                .collect(Collectors.toList());

        return finishFormations;
    }

    public Formation AddMod(String id, MyModule module) {
       return  formationRepository.findById(id)
                .map(st -> {


                    if (st.getModules()== null) {
                        st.setModules(new ArrayList<>()); // Créer une nouvelle liste si elle est null
                    }
                        module.setProgress(0);
                    st.getModules().add(module); // Ajouter la formation à la liste

                    return formationRepository.save(st);
                }).orElseThrow(() -> new UserNotFoundException("Sorry, this formation could not be found"));

    }
    public Formation AddSub(String id, String nameModule, Subtitle subtitle) {
        Optional<Formation> formationOptional = formationRepository.findById(id);

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
        }

        // Return null or throw an exception, depending on your requirements
        return null;
    }


    public Integer getProgress(String id, String nameFormation) {
        // Rechercher l'utilisateur par son ID
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Parcourir les formations de l'utilisateur
            for (Formation formation : user.getFormations()) {
                // Vérifier si le nom de la formation correspond à celui recherché
                if (formation.getTitle().equals(nameFormation)) {
                    // Récupérer la liste des modules de la formation
                    List<MyModule> modules = formation.getModules();

                    // Vérifier si la liste des modules est null ou vide
                    if (modules == null || modules.isEmpty()) {
                        return 0; // Retourner 0 si la liste des modules est null ou vide
                    }

                    // Calculer le progrès de la formation
                    int totalModules = modules.size();
                    int completedModules = 0;

                    // Parcourir les modules de la formation
                    for (MyModule module : modules) {
                        // Vérifier si le statut du module est vrai
                        if (module.getStateM().equals(true)) {
                            completedModules++;
                        }
                    }

                    // Calculer le progrès en pourcentage
                    if (totalModules > 0) {
                        return (int) ((double) completedModules / totalModules * 100);
                    } else {
                        return 0; // Retourner 0 si aucun module n'est disponible dans la formation
                    }
                }
            }

            // Si la formation spécifiée n'est pas trouvée, retourner -1
            return -1;
        } else {
            throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        }
    }

    public List<Formation> getAllFormationsMore(){
        return formationRepository.findAllMore();
    }
    public Formation getFormationById(String id){
        return formationRepository.findById(id).orElse(null);
    }
    public boolean deleteFormation(String id){
        formationRepository.deleteById(id);
        List<User> usersWithUpdatedFormation = userRepo.findAllByFormationName(id);

        // Mettre à jour la formation dans chaque utilisateur
        for (User user : usersWithUpdatedFormation) {
            List<Formation> formations = user.getFormations();
            for (Formation formation : formations) {
                if (formation.getId().equals(id)) {
                    formations.remove(formation);
                    // Mettre à jour d'autres champs si nécessaire
                    break;
                }
            }
            user.setFormations(formations);
            userRepo.save(user);
        }
        return false;
    }
    public void save(Formation formations){
        formationRepository.save(formations);
    }

    public void updateFormation(String formationId, Formation updatedFormation) {
        Formation existingFormation = formationRepository.findById(formationId).orElse(null);

            // Update the existing formation with the new data
            existingFormation.setTitle(updatedFormation.getTitle());

            existingFormation.setDescription(updatedFormation.getDescription());

            existingFormation.setPhoto(updatedFormation.getPhoto());
            existingFormation.setLangue(updatedFormation.getLangue());
            existingFormation.setLocalisation(updatedFormation.getLocalisation());
            //User existinguser = userRepo.findAllByFormationName(updatedFormation.getTitle()).orElse(null);
            // Save the updated formation


        // Mettre à jour la formation dans la base de données
        Formation savedFormation = formationRepository.save(existingFormation);

        // Récupérer tous les utilisateurs ayant la formation modifiée
        List<User> usersWithUpdatedFormation = userRepo.findAllByFormationName(formationId);

        // Mettre à jour la formation dans chaque utilisateur
        for (User user : usersWithUpdatedFormation) {
            List<Formation> formations = user.getFormations();
            for (Formation formation : formations) {
                if (formation.getId().equals(formationId)) {
                    formation.setTitle(savedFormation.getTitle());
                    formation.setDescription(savedFormation.getDescription());
                    // Mettre à jour d'autres champs si nécessaire
                    break;
                }
            }
            user.setFormations(formations);
            userRepo.save(user);
        }
    }


    public Formation AddModules(String id, Formation updatedFormation) {
        Formation existingFormation = formationRepository.findById(id).orElse(null);
        if (existingFormation != null) {
            // Update the existing formation with the new data
            existingFormation.setModules(updatedFormation.getModules());
            // Save the updated formation
            return formationRepository.save(existingFormation);
        } else {
            return null;
        }
    }






}
