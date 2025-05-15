import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: ""
    });

  //const [cargando, setCargando] = useState(true);
  //const [imagen, setImagen] = useState(null);
  //const [imagenUrl, setImagenUrl] = useState(null);
    const [nuevaUrl, setNuevaUrl] = useState("");
    const [imagenes, setImagenes] = useState([]);

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

const fetchImagenes = async (usuarioid) => {
  const { data, error } = await supabase
    .from("multimedia")
    .select("*")
    .eq("usuarioid", usuarioid);
  if (data) setImagenes(data);
};

// Actualizar datos del usuario
const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);
    if (error) { alert("Error al actualizar el usuario"); }
    else alert("Datos actualizados")
  };

  const handleAgregarUrl = async (e) => {
    if (!nuevaUrl.trim()) return;
    const { error } = await supabase
      .from("multimedia")
      .insert({ url: nuevaUrl, usuarioid: usuario.id });
    if (error) {
      alert("Error al agregar la URL");
    } else {
      setNuevaUrl("");
    }