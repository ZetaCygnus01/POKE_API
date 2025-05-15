import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import './App.css';

import { supabase } from "./supabase";
import Menu from './Componentes/Menu'
import Aleatorios from './Componentes/Aleatorios';
import Lista from './Componentes/Lista';
import Capturados from './Componentes/Capturados';
import Favoritos from './Componentes/Favoritos';
import Usuarios from './Componentes/Usuarios';
import Detalle from './Componentes/Detalle';
import Login from './Componentes/Login';

function App() {
const [usuario, setUsuario] = useState(null);
const [cargando, setCargando] = useState(true);

useEffect(() => {
async function verificarSesion() {
const { data: { session } } = await supabase.auth.getSession();
setUsuario(session?.user || null);
setCargando(false);
}
verificarSesion();

// Escucha cambios en la sesión
supabase.auth.onAuthStateChange((_event, session) => {

setUsuario(session?.user || null);
});
}, []);

if (cargando) return <p>Cargando...</p>;

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
        <Route path="/login" element={<Login />} />
      </Routes>

    </Router>
    </AppProvider>
  );
}

export default App;