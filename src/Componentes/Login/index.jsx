import { useState, useEffect } from 'react'
import { supabase } from '../../supabase'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();  // Definir navigate

    const handleLogin = async (e) => { e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("usuario o contraseña no valido")
    else {
        navigate("/")
    }
}

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesion</button>
            </form>
            <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        </div>
    )
}
export default Login;