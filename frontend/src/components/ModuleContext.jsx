import React, { createContext, useContext, useState } from 'react';

const ModuleContext = createContext();

export const useModule = () => useContext(ModuleContext);

export const ModuleProvider = ({ children }) => {
    const [submoduleBoldStatus, setSubmoduleBoldStatus] = useState({});

    const updateSubmoduleBoldStatus = (key, isBold) => {
        setSubmoduleBoldStatus(prev => ({
            ...prev,
            [key]: isBold
        }));
    };

    return (
        <ModuleContext.Provider value={{ submoduleBoldStatus, updateSubmoduleBoldStatus }}>
            {children}
        </ModuleContext.Provider>
    );
};
