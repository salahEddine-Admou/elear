import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import Register from './views/Register';
import Home from './views/Home';
import Layouts from './layout/Layouts';
import Notification from './views/Notification';
import Email from './views/Email';
import Test from './views/Test';
import Dashbord from './views/Dashbord';
import Formation from './views/Formation';
import Parcourirmodules from './views/ParcourirModules';
import HomeC from './views/HomeC';
import Home1 from './views/Home1';
import Training from './views/Trainings';
import Certificats from './views/Certificats';
<<<<<<< HEAD

import AjoutFormation from './views/ajoutFormation';

=======
import AjoutFormation from "./views/ajoutFormation";
>>>>>>> 738f3d987ae7fc56a11d346ec51cd4452e1e0fd1
import Par from "./views/UserCours"
import FormationInput from "./views/FormationInput";
import Settings from './views/Settings';


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
        <Route index element={userRole === 'ADMIN' ? <Dashbord /> : <HomeC />} />
        <Route path="notification" element={<Notification />} />
        <Route path="email" element={<Email />} />
        <Route path="test" element={<Test />} />
        <Route path="users" element={<Home />} />
        <Route path="formation" element={<Formation />} />
        <Route path="dashbord" element={<Dashbord />} />
        <Route path="Certificats" element={<Certificats />} />
        <Route path="homeC" element={<HomeC />} />
        <Route path="home1" element={<Home1 />} />
      </Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="modules" element={<Par />} />
      <Route path='AjoutModuleFormation' element={<AjoutFormation />} />
      <Route path='FormationInput' element={<FormationInput />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>
          
    
  );
}


export default App;

