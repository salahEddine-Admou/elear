import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='home' element={<LandingPage />}/>
      </Routes>
    </BrowserRouter>
  );
}


const Layout = () => {
  

  return <div>This is the layout component</div>;
};

export default App;

