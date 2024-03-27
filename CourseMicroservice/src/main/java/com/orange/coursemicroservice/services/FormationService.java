package com.orange.coursemicroservice.services;

import com.orange.coursemicroservice.model.Formation;
import com.orange.coursemicroservice.repository.Formationrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FormationService {
    @Autowired
    private Formationrepository formationRepository;

    public Formation CreateFormation(Formation formation) {
        return formationRepository.save(formation);
    }
    public List<Formation> getAllFormations(){
        return formationRepository.findAll();
    }
    public Formation getFormationById(String id){
        return formationRepository.findById(id).orElse(null);
    }
    public boolean deleteFormation(String id){
        formationRepository.deleteById(id);
        return false;
    }
    public void save(Formation formations){
        formationRepository.save(formations);
    }
    public Formation updateFormation(String id, Formation updatedFormation) {
        Formation existingFormation = formationRepository.findById(id).orElse(null);
        if (existingFormation != null) {
            // Update the existing formation with the new data
            existingFormation.setNom(updatedFormation.getNom());
            existingFormation.setTitre(updatedFormation.getTitre());
            existingFormation.setDescription(updatedFormation.getDescription());
            existingFormation.setInstructeur(updatedFormation.getInstructeur());
            existingFormation.setContenu(updatedFormation.getContenu());
            existingFormation.setPhoto(updatedFormation.getPhoto());
            existingFormation.setLangue(updatedFormation.getLangue());
            existingFormation.setLocalisation(updatedFormation.getLocalisation());
            // Save the updated formation
            return formationRepository.save(existingFormation);
        } else {
            return null;
        }
    }

}
