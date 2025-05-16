import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    rol: ""
  });

  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const navigate = useNavigate();

  // Obtener datos del usuario
  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setUsuario(data);
          setForm(data);
          fetchImagenes(user.id);
        }
      }
    }
    fetchUsuario();
  }, []);

  // Obtener imágenes
  const fetchImagenes = async (usuarioid) => {
    const { data, error } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);
    if (data) setImagenes(data);
  };

  // Actualizar datos del usuario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);
    if (error) alert("Error al actualizar");
    else alert("Datos actualizados");
  };

  // Agregar nueva URL de imagen
  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return;
    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);
    if (error) {
      alert("Error al agregar la Imagen");
    } else {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    }
  };

  // Eliminar imagen
  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);
    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error al cerrar sesión");
    } else {
      alert("Sesión cerrada");
      navigate("/login");
    }
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <label>Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label><br />
      <label>Correo:
        <input name="correo" value={form.correo} onChange={handleChange} />
      </label><br />
      <label>Fecha de nacimiento:
        <input 
          type="date" 
          name="fecha_nacimiento"
          value={form.fecha_nacimiento} 
          onChange={handleChange} 
        />
      </label><br />
      <label>Teléfono:
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </label><br />
      <label>Rol:
        <input name="rol" value={form.rol} onChange={handleChange} />
      </label><br />
      <button onClick={handleUpdate}>Guardar Cambios</button>

      <hr />

      <h3>Agregar Imagen</h3>
      <input
        type="text"
        placeholder="URL de la imagen"
        value={nuevaUrl}
        onChange={(e) => setNuevaUrl(e.target.value)}
      />
      <button onClick={handleAgregarUrl}>Agregar</button>
      
      <h3>Imágenes Guardadas</h3>
      <ul>
        {imagenes.map((img) => (
          <li key={img.id}>
            <img src={img.url} alt="Imagen" width="100" />
            <br />
            <button onClick={() => handleEliminarImagen(img.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      
      <hr />
      <h2>Cerrar Sesión</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>

      {/* Espacio adicional para que el menú no tape el botón */}
      <br /><br /><br /><br /><br />
    </div>
  );
}
// Comparar con el código de src/Componentes/Usuarios/index.jsx
