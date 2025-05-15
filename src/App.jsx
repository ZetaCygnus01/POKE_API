import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';


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
       <Route path="/" element={usuario ? <Lista /> : <Navigate to="/login"/>} />
            <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />
            <Route path="/aleatorios" element={usuario ? <Aleatorios /> :
            <Navigate to="/login" />} />
            <Route path="/capturados" element={usuario ? <Capturados /> :
            <Navigate to="/login" />} />
            <Route path="/favoritos" element={usuario ? <Favoritos /> :
            <Navigate to="/login" />} />
            <Route path="/detalle/:name" element={usuario ? <Detalle /> :
            <Navigate to="/login" />} />
            <Route path="/login" element={<Login/>} />
      </Routes>

    </Router>
    </AppProvider>
  );
}

export default App;