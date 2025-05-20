import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Lista</Link>
          <Link to="/capturados">Capturados</Link>
          <Link to="/aleatorios">Aleatorio</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/administrador">Administrador</Link>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
        </nav>
    )
  }
  
  export default Menu