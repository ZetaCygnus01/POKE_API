import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Listar from  './Componentes/Listar'
import Aleatorios from  './Componentes/Aleatorios'
import Detalle from  './Componentes/Detalle'
import Favoritos from './Componentes/Favoritos'
import Original from './Componentes/Original'
import Usuario from './Componentes/Usuario'
import Menu from './Componentes/Menu';



function App() {

  return (
    <Router>

      <Menu />
     
      <Routes>
        <Route path="/" element={<Listar />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/aleatorios" element={<Aleatorios />} />
        <Route path="/Original" element={<Original />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/:nombre" element={<Detalle />} />
        <Route path="/detalle/:name" element={<Detalle />} />
      </Routes>
   
    </Router>
  );
}

export default App
