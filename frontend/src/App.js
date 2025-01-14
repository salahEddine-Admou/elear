import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import Register from './views/Register';
import Home from './views/Home';
import Layouts from './layout/Layouts';
import Notification from './views/Notification';
import Email from './views/Email';
import Test from './views/Test';
import Dashboard from './views/Dashboard';
import Formation from './views/Formation';
import Parcourirmodules from './views/ParcourirModules';
import HomeC from './views/HomeC';
import Home1 from './views/Home1';
import Training from './views/Trainings';
import Certificats from './views/Certificats';
import AjoutFormation from "./views/ajoutFormation";
import Par from "./views/UserCours"
import FormationInput from "./views/FormationInput";
import Settings from './views/Settings';
import TestFinal from './views/TestFinal';
import TestFinalInput from './components/TestFinalsInput';
import TestInput from './components/TestInput';


function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check local storage for user role and set it
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);
  return (
    
   
    <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Layouts />}>
      <Route path="trainings" element={<Training />} />
        <Route index element={userRole === 'ADMIN' ? <Dashboard /> : <HomeC />} />
        <Route path="notification" element={<Notification />} />
        <Route path="email" element={<Email />} />
        <Route path="test" element={<Test />} />
        <Route path="users" element={<Home />} />
        <Route path="formation" element={<Formation />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="Certificats" element={<Certificats />} />
        <Route path="homeC" element={<HomeC />} />
        <Route path="home1" element={<Home1 />} />
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="modules" element={<Par />} />
      <Route path='AjoutModuleFormation' element={<AjoutFormation />} />

      <Route path='TestFinal' element={<TestFinalInput />} />
      <Route path='FormationInput' element={<FormationInput />} />
      <Route path="settings" element={<Settings />} />
      <Route path="TestFinal" element={<TestFinal />} />
      <Route path="testInput" element={<TestInput />} />

    </Routes>
  </BrowserRouter>
          
    
  );
}


export default App;

