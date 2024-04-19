import React, { useEffect } from 'react';
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


function App() {
  return (
    
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Dashbord />} />
          <Route path="notification" element={<Notification />} />
          <Route path="email" element={<Email />} />
          <Route path="test" element={<Test />} />
          <Route path="users" element={<Home />} />
          <Route path="formation" element={<Formation />} />
          <Route path="dashbord" element={<Dashbord />} />
        </Route>
          <Route path="login" element={<LoginPage />} />
<<<<<<< Updated upstream
          <Route path="register" element={<Register />} />
=======
          <Route path="modules" element={<Parcourirmodules />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}


export default App;

