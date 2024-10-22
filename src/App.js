import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Login';
import {Dashboard} from './paginas/Dashboard'
import { RegistroProyectos } from "./paginas/RegistroProyectos";
import { ModuloPruebas } from "./paginas/moduloPruebas";

function App() {
  return (
/*<div>
      <Login />
    </div>
    */
     
    <Router> 
      <Routes> 
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proyectos" element={<RegistroProyectos />}/>
        <Route path="/ModuloPruebas" element={<ModuloPruebas />}/>
      </Routes>
    </Router>
  );
}

export default App;
