package com.helloIftekhar.springJwt.service;
import com.helloIftekhar.springJwt.model.MyModule;
import com.helloIftekhar.springJwt.model.Submodule;
import com.helloIftekhar.springJwt.repository.ModuleRep;
import com.helloIftekhar.springJwt.repository.SubmoduleRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ModuleService {
    private final ModuleRep moduleRep;
    private final SubmoduleRep submoduleRep;

    public List<MyModule> getAllModules() {
        return moduleRep.findAll();
    }

    public MyModule createModule(MyModule module) {
        return moduleRep.save(module);
    }

    public MyModule updateModule(String id, MyModule module) {
        return moduleRep.findById(id)
                .map(existingModule -> {
                    existingModule.setName(module.getName());
                    //existingModule.setStateM(module.getStateM());
                    existingModule.setSubmodules(module.getSubmodules());
                    return moduleRep.save(existingModule);

                }).orElse(null);
    }

    public boolean deleteModule(String id) {
        if (moduleRep.existsById(id)) {
            moduleRep.deleteById(id);
            return true;
        }
        return false;
    }

    public Submodule addSubmodule(String moduleId, Submodule submodule) {
        return moduleRep.findById(moduleId).map(module -> {
            final Submodule savedSubmodule = submoduleRep.save(submodule);
            module.getSubmodules().add(savedSubmodule);
            moduleRep.save(module);
            return savedSubmodule;
        }).orElse(null);
    }
    public List<Submodule> getSubmodulesForModule(String moduleId) {
        return moduleRep.findById(moduleId).map(MyModule::getSubmodules).orElse(null);
    }
}

