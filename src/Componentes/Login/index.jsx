import { useState, useEffect } from 'react'
import { supabase } from '../../supabase'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => { e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("usuario o contraseña no valido")
    else {
        setUser(data.user)
        cargarTareasDelUsuario(data.user.id)
    }
}

    return (
        <div>
            <h2>Login</h2>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
export default Login;