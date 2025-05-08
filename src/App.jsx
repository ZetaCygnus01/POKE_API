import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';

import Menu from './Componentes/Menu'
import Aleatorios from './Componentes/Aleatorios';
import Lista from './Componentes/Lista';
import Capturados from './Componentes/Capturados';
import Favoritos from './Componentes/Favoritos';
import Usuarios from './Componentes/Usuarios';
import Detalle from './Componentes/Detalle';

function App() {

  return (
    <AppProvider>
    <Router>
      <Menu />

      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/aleatorios" element={<Aleatorios />} />
        <Route path="/capturados" element={<Capturados />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/detalle/:name" element={<Detalle />} />
      </Routes>

    </Router>
    </AppProvider>
  );
}

export default App;